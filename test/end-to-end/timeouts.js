/**
 * @author sarkiroka on 2016.05.08.
 */
var acnsy = require('../../index_v2');
var addToResultFactory = require('./helper/add-to-result-factory');
var ifTaskFactory = require('./helper/if-task-factory');
describe('acnsy timeout', function () {
	it('pass error to the end task when timeout reached - serial case', function (done) {
		var params = {a: 1, result: 0};
		var timeA = 100;
		var currentTimeout = 50;
		var addA = addToResultFactory(timeA, 'a');
		addA.timeout = currentTimeout;
		var tasks = [addA];
		var startTime = Date.now();

		acnsy(params, tasks, function (err, givenParams) {
			var endTime = Date.now();
			expect(err).toBeTruthy('should pass an error');
			var timeDiff = endTime - startTime + 1;
			expect(timeDiff).not.toBeLessThan(currentTimeout, 'should wait the timeout seted time');
			expect(timeDiff).toBeLessThan(timeA, 'should stop execution when timeout reached');
			done();
		})
	});

	it('pass error to the end task when timeout reached - parallel case', function (done) {
		var params = {a: 1, result: 0};
		var timeA = 200;
		var currentTimeout = 50;
		var addA = addToResultFactory(timeA, 'a');
		addA.timeout = currentTimeout;
		var tasks = [[addA]];
		var startTime = Date.now();

		acnsy(params, tasks, function (err, givenParams) {
			var endTime = Date.now();
			expect(err).toBeTruthy('should pass an error');
			var timeDiff = endTime - startTime + 1;
			expect(timeDiff).not.toBeLessThan(currentTimeout, 'should wait the timeout seted time');
			expect(timeDiff).toBeLessThan(timeA, 'should stop execution when timeout reached');
			done();
		})
	});

	it('pass error to the end task when timeout reached - if-condition case', function (done) {
		var time = 100;
		var currentTimeout = 50;
		var ifTask = ifTaskFactory(true, time);
		ifTask.timeout = currentTimeout;
		var tasks = [acnsy.if(ifTask)];
		var startTime = Date.now();

		debugger;
		acnsy(tasks, function (err, givenParams) {
			var endTime = Date.now();
			expect(err).toBeTruthy('should pass an error');
			var timeDiff = endTime - startTime + 1;
			expect(timeDiff).not.toBeLessThan(currentTimeout, 'should wait the timeout seted time');
			expect(timeDiff).toBeLessThan(time, 'should stop execution when timeout reached');
			done();
		})
	});
});
