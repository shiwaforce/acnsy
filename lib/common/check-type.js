/**
 * @author sarkiroka on 2016.03.28.
 */
var getType = require('./get-type');
module.exports = function (variable, expectedType) {
	var expectedResult = ('' + expectedType).toLowerCase();
	return getType(variable) == expectedResult;
};
