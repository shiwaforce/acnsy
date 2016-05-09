/**
 * @author sarkiroka on 2016.04.20.
 */
var getType = require('../common/get-type');
module.exports = function (array, task) {
	if (getType(task) != 'function') {
		throw new Error('acnsy error: the task for each must be a function');
	}
	var rAsync = require('../../index_v2');
	var typeOfArray = getType(array);
	var retValue = [];
	switch (typeOfArray) {
		case 'array':
			array.forEach(function (item) {
				retValue.push(function each(params, callback) {
					task.call({item: item}, params, callback);
				});
			});
			break;
		case 'string':
			retValue = function each(params, callback) {//TODO get information for need parallel or serial. now always creates a prallel exection
				rAsync(params, [rAsync.each(params[array], task)], callback);
			};
			break;
		default:
			throw new Error('acnsy error: each array parameter is not a valid type. allow string (which point to property of params) or array (which will be iterated)');
	}
	return retValue;
};
