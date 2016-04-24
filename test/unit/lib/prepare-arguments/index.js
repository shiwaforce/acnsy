require('expectations');
var getTestfile = require('../../../util/get-testfile')(__filename);
describe('prepare arguments', function () {
	var requires = {};
	var testfile = getTestfile({requires: requires});

	it('handles when only tasks defined', function () {
		var testTasks = [1, 2, 3];
		var result = testfile(testTasks);
		expect(result.tasks).toEqual(testTasks, 'should pass the tasks');
	});

});
