/**
 * @author sarkiroka on 2016.03.28.
 */
var getType = require('./../common/get-type');
var noop = new Function();
module.exports = function (end) {
	return getType(end, 'function') ? end : noop;
};
