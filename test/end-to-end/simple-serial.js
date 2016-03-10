/**
 * @author sarkiroka on 2016.05.08.
 */
var acnsy = require('../../index_v2');
var addToResultFactory = require('./helper/add-to-result-factory');
describe('simple serial functionality', function () {
	it('can add two number in async', function (done) {
		var params = {a: 1, b: 2, result: 0};
		var timeA = 100;
		var timeB = 150;

		var addA = addToResultFactory(timeA, 'a');
		var addB = addToResultFactory(timeB, 'b');

		var tasks = [addA, addB];
		var startTime = Date.now();
		acnsy(params, tasks, function (err, givenParams) {
			var endTime = Date.now();
			expect(err).toBeFalsy('shouldn\'t pass any error');
			expect(givenParams.result).toEqual(params.a + params.b, 'should calculate correctly');
			var timeDiff = endTime - startTime;
			expect(timeDiff).not.toBeLessThan(timeA + timeB, 'when the exectution is serial, the all time should not be less than sum of each task times');
			done();
		})
	});
});
