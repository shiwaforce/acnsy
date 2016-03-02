require('expectations');
var testfile = require('../../../../lib/prepare-arguments/validate-task-list');
describe('validate task list', function () {
	it('throw an error when no more deep', function () {
		expect(function () {
			testfile(null, 0);
		}).toThrow(false, 'should throw an error when no more deep available');
	});

	describe('unnamed function check', function () {
		var getValidateTaskList = require('../../../util/get-testfile')(__filename);
		var requires = {
			'../common/get-type': sinon.stub().returns('function')
		};
		var globals = {
			console: {
				warn: sinon.stub()
			}
		};
		var validateTaskList = getValidateTaskList({
			requires: requires,
			globals: globals
		});

		afterEach(function () {
			globals.console.warn.reset();
		});

		it('prints a warning when use unnamed functions in tasklist', function () {
			var task = function () {
			};
			validateTaskList([task], 1);
			expect(globals.console.warn.called).toBe(true, 'should prints warning when use an unnamed function');
		});
		it('prints a warning when use unnamed functions in tasklist', function () {
			function task() {
			};
			validateTaskList([task], 1);
			expect(globals.console.warn.called).toBe(false, 'should not prints warning when use a named function');
		});
	});
});
