require('expectations');
var testfile = require('../../../../lib/prepare-arguments/create-safe-parameters');
var getType = require('../../../../lib/common/get-type');
describe('create safe parameters', function () {
	for (var i = 0; i <= 3; i++) {
		var parameters = [];
		for (j = 0; j < i; j++) {
			parameters.push(j);
		}
		it('handles ' + i + ' parameter', function () {
			var result = testfile.apply(null, parameters);
			expect(getType(result)).toEqual('object', 'should produce an object value');
			expect(result.params).toEqual(parameters[0], 'should pass the params');
			expect(result.tasks).toEqual(parameters[1], 'should pass the task list');
			expect(result.end).toEqual(parameters[2], 'should pass the end callback');
		});
	}
});
