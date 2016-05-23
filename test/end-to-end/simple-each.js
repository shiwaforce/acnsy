/**
 * @author sarkiroka on 2016.05.08.
 */
var acnsy = require('../../index_v2');
var addToResultFactory = require('./helper/add-to-result-factory');
describe('simple each functionality', function () {
	it('can add each number in async', function (done) {
		var params = {a: [30, 10, 2], result: 0};
		var sum = 0;
		params.a.forEach(function (i) {
			sum += i;
		});
		var time = 20;

		function addItems(params, callback) {
			var item = this.item;
			setTimeout(function () {
				params.result += item;
				callback(null, params);
			}, time);
		}

		var tasks = [acnsy.each('a', addItems)];
		var startTime = Date.now();
		acnsy(params, tasks, function (err, givenParams) {
			var endTime = Date.now();
			expect(err).toBeFalsy('shouldn\'t pass any error');
			expect(givenParams.result).toEqual(sum, 'should calculate correctly');
			var timeDiff = endTime - startTime + 1;
			expect(timeDiff).not.toBeLessThan(time, 'each calls the task for each item');
			expect(timeDiff).toBeLessThan(time * 3, 'each executed parallel');
			done();
		})
	});

	it('throw an error when task is not a function', function () {
		expect(function () {
			acnsy([acnsy.each('x', null)]);
		}).toThrow(false, 'should throw an error when task is not a function');
	});

	it('throw an error when first parameter is not an array or string (which points to the property of params)', function () {
		expect(function () {
			acnsy([acnsy.each(null, new Function())]);
		}).toThrow(false, 'should throw an error when first parameter is not an array or string');
	});
});
