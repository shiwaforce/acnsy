/**
 * elkészíti a waterfall futtatót
 * @author sarkiroka
 */
var async = require('async');
module.exports = function (functions, end) {
	return function () {
		async.waterfall(functions, end);
	}
};
