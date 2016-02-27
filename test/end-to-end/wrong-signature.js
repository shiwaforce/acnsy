/**
 * @author sarkiroka on 2016.05.08.
 */
var acnsy = require('../../index_v2');
describe('validate parameters', function () {
	it('throw an error when tasklist contains not-a-function', function () {
		var tasks = [null];
		expect(function () {
			acnsy(tasks);
		}).toThrow(false, 'should throw an error when tasklist contains not-a-function');
	});
});
