/**
 * @author sarkiroka on 2016.05.08.
 */
module.exports = function (result, timeoutMs) {
	var timeout = timeoutMs || 0;
	return function (params, callback) {
		setTimeout(function () {
			params.ifResult = result;
			callback(null, params);
		}, timeout);
	}
};
