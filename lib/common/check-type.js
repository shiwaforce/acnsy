/**
 * @author sarkiroka on 2016.03.28.
 */
const PREFIX = '[object ';
const POSTFIX = ']';
var capitalizeFirstLetter = require('./capitalize-first-letter');
var getType = require('./get-type');
module.exports = function (variable, expectedType) {
	var expectedResult = PREFIX + capitalizeFirstLetter(expectedType) + POSTFIX;
	return getType(variable) == expectedResult;
};
