require('expectations');
var getTestfile = require('../../../util/get-testfile')(__filename);
var getType = require('../../../../lib/common/get-type');
describe('prepare arguments', function () {

	var mockCreateSafeParameters = sinon.stub();
	var mockValidateTaskList = sinon.stub();
	var requires = {
		'./create-safe-parameters': mockCreateSafeParameters,
		'./../common/get-type': getType,
		'./validate-task-list': mockValidateTaskList
	};
	var testfile = getTestfile({requires: requires});

	afterEach(function () {
		mockCreateSafeParameters.reset();
		mockValidateTaskList.reset();
	});

	var possibleValues = [null, 42, 'str', {type: 'object'}, /regex/, new Function(), new Date(), undefined];
	for (var i = 0,iMax=possibleValues.length; i < iMax; i++) {
		var value = possibleValues[i];
		possibleValues.push([value]);//array of ...
	}
	var possibleSignatures = [];
	var validSignatures = ['arrayoffunction,undefined,undefined', 'arrayoffunction,function,undefined', 'object,arrayoffunction,undefined', 'object,arrayoffunction,function'];
	for (var i = 0; i < possibleValues.length; i++) {
		for (var j = 0; j < possibleValues.length; j++) {
			for (var k = 0; k < possibleValues.length; k++) {
				var params = [];
				var p1 = possibleValues[i];
				var p2 = possibleValues[j];
				var p3 = possibleValues[k];
				var t1=getType(p1);
				var t2=getType(p2);
				var t3=getType(p3);
				if(t1=='array'){t1+='of'+getType(p1[0]);}
				if(t2=='array'){t2+='of'+getType(p2[0]);}
				if(t3=='array'){t3+='of'+getType(p3[0]);}
				params.push(t1);
				params.push(t2);
				params.push(t3);
				var s = params.toString();
				var isValid = validSignatures.indexOf(s) > -1;
				possibleSignatures.push({ok: isValid, params: [p1, p2, p3], s: s});
			}
		}
	}
	possibleSignatures.forEach(function (signature) {
		it('handles when ' + signature.s + ' are the arguments, it\'s ' + (signature.ok ? 'ok' : 'throws an error'), function () {
			if (signature.ok) {
				expect(function () {
					testfile.apply(null, signature.params);
				}).not.toThrow('shouldn\'t throw an error when good parameters passed');
			} else {
				expect(function () {
					testfile.apply(null, signature.params);
				}).toThrow(false, 'should throw an error when wrong parameters passed');
			}
		});
	})

});
