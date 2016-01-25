/**
 * elkészíti a parallel futtatót
 * @author sarkiroka
 */
var async = require('async');
module.exports = function (functions) {
	return function (params, callback) {
		for (var i = 0; i < functions.length; i++) {
			var fn = functions[i];
			(function (fn) {
				functions[i] = function (callback) {
					fn(params, callback);
				}
			})(fn);
		}
		async.parallel(functions, function (err, results) {
			callback(err, params)
		});
	};
};
