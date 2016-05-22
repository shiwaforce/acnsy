/**
 * @author sarkiroka on 2016.05.08.
 */
var acnsy = require('../../index_v2');
var addToResultFactory = require('./helper/add-to-result-factory');
var ifTaskFactory = require('./helper/if-task-factory');
describe('simple if functionality', function () {
	it('can use the true branch', function (done) {
		var params = {a: 1, b: 2, result: 0};
		var timeA = 100;
		var timeB = 150;
		var addA = addToResultFactory(timeA, 'a');
		var addB = addToResultFactory(timeB, 'b');
		var ifTask = ifTaskFactory(true);
		var tasks = [acnsy.if(ifTask, addA, addB)];
		var startTime = Date.now();

		acnsy(params, tasks, function (err, givenParams) {
			var endTime = Date.now();
			expect(err).toBeFalsy('shouldn\'t pass any error');
			expect(givenParams.result).toEqual(params.a, 'should calculate with only "a"');
			var timeDiff = endTime - startTime + 1;
			expect(timeDiff).not.toBeLessThan(timeA, 'when use if, the selected branch run only');
			expect(timeDiff).toBeLessThan(timeB, 'when use if, the selected branch run only');
			done();
		})
	});
	it('can use the true branch only', function (done) {
		var params = {a: 1, b: 2, result: 0};
		var timeA = 100;
		var addA = addToResultFactory(timeA, 'a');
		var ifTask = ifTaskFactory(true);
		var tasks = [acnsy.if(ifTask, addA)];
		var startTime = Date.now();

		acnsy(params, tasks, function (err, givenParams) {
			var endTime = Date.now();
			expect(err).toBeFalsy('shouldn\'t pass any error');
			expect(givenParams.result).toEqual(params.a, 'should calculate with only "a"');
			var timeDiff = endTime - startTime + 1;
			expect(timeDiff).not.toBeLessThan(timeA, 'when use if, the selected branch run only');
			done();
		})
	});
	it('can use the false branch', function (done) {
		var params = {a: 1, b: 2, result: 0};
		var timeA = 150;
		var timeB = 100;
		var addA = addToResultFactory(timeA, 'a');
		var addB = addToResultFactory(timeB, 'b');
		var ifTask = ifTaskFactory(false);
		var tasks = [acnsy.if(ifTask, addA, addB)];
		var startTime = Date.now();

		acnsy(params, tasks, function (err, givenParams) {
			var endTime = Date.now();
			expect(err).toBeFalsy('shouldn\'t pass any error');
			expect(givenParams.result).toEqual(params.b, 'should calculate with only "b"');
			var timeDiff = endTime - startTime + 1;
			expect(timeDiff).not.toBeLessThan(timeB, 'when use if, the selected branch run only');
			expect(timeDiff).toBeLessThan(timeA, 'when use if, the selected branch run only');
			done();
		})
	});
	it('can use the false branch when not defined it', function (done) {
		var params = {a: 1, b: 2, result: 0};
		var timeA = 100;
		var addA = addToResultFactory(timeA, 'a');
		var ifTask = ifTaskFactory(false);
		var tasks = [acnsy.if(ifTask, addA)];
		var startTime = Date.now();

		acnsy(params, tasks, function (err, givenParams) {
			var endTime = Date.now();
			expect(err).toBeFalsy('shouldn\'t pass any error');
			expect(givenParams.result).toEqual(0, 'should not calculate with any');
			var timeDiff = endTime - startTime + 1;
			expect(timeDiff).toBeLessThan(timeA, 'when use if, the selected branch run only, and if not defined it, the run noop task quickly');
			done();
		})
	});
	it('can use the true branch when not defined it', function (done) {
		var params = {a: 1, b: 2, result: 0};
		var timeA = 100;
		var addA = addToResultFactory(timeA, 'a');
		var ifTask = ifTaskFactory(true);
		var tasks = [acnsy.if(ifTask, null, addA)];
		var startTime = Date.now();

		acnsy(params, tasks, function (err, givenParams) {
			var endTime = Date.now();
			expect(err).toBeFalsy('shouldn\'t pass any error');
			expect(givenParams.result).toEqual(0, 'should not calculate with any');
			var timeDiff = endTime - startTime + 1;
			expect(timeDiff).toBeLessThan(timeA, 'when use if, the selected branch run only, and if not defined it, the run noop task quickly');
			done();
		})
	});
	it('throw an error when condition is not a task', function () {
		var timeA = 100;
		var addA = addToResultFactory(timeA, 'a');

		expect(function () {
			acnsy.if(null, addA);
		}).toThrow(false, 'should throw an error when condition is not a function');
	});
	it('throw an error when true branch is defined (not falsy) and is not a task', function () {
		var ifTask = ifTaskFactory(true);

		expect(function () {
			acnsy.if(ifTask, 42);
		}).toThrow(false, 'should throw an error when a branch is not a function');
	});
	it('throw an error when false branch is defined (not falsy) and is not a task', function () {
		var ifTask = ifTaskFactory(true);

		expect(function () {
			acnsy.if(ifTask, null, 42);
		}).toThrow(false, 'should throw an error when a branch is not a function');
	});
});
