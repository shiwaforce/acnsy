/**
 * összeadás taszkot gyártó függvény
 * @author sarkiroka on 2016.05.08.
 */
module.exports = function (timeout, property) {
	return function addToResult(params, callback) {
		setTimeout(function () {
			params.result += params[property];
			callback(null, params);
		}, timeout);
	}
};
