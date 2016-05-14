require('expectations');
var getTestfile = require('../../../util/get-testfile')(__filename);
var getType = require('../../../../lib/common/get-type');
describe('prepare arguments', function () {

	var mockCreateSafeParameters = sinon.stub().returns(42);
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

	var possibleValues = [null, 42, 'str', {type: 'object'}, /regex/, new Function(), new Date(), undefined, []];
	var possibleSignatures = [];
	var validSignatures = ['array,undefined,undefined', 'array,function,undefined', 'object,array,undefined', 'object,array,function'];
	for (var i = 0; i < possibleValues.length; i++) {
		for (var j = 0; j < possibleValues.length; j++) {
			for (var k = 0; k < possibleValues.length; k++) {
				var params = [];
				var p1 = possibleValues[i];
				var p2 = possibleValues[j];
				var p3 = possibleValues[k];
				var t1 = getType(p1);
				var t2 = getType(p2);
				var t3 = getType(p3);
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
		it('handles when ' + signature.s + ' are the arguments, and it should ' + (signature.ok ? 'returns ok' : 'throws an error'), function () {
			if (signature.ok) {
				expect(function () {
					testfile.apply(null, signature.params);
				}).not.toThrow('shouldn\'t throw an error when good parameters passed');
				var result = testfile(signature.params[0], signature.params[1], signature.params[2]);
				expect(result).toEqual(42, 'should returns always safe paramter');
			} else {
				expect(function () {
					testfile.apply(null, signature.params);
				}).toThrow(false, 'should throw an error when wrong parameters passed');
			}
		});
	})

});
