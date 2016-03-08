/**
 * @author sarkiroka on 2016.05.08.
 */
module.exports = function (result) {
	return function (params, callback) {
		params.ifResult = result;
		callback(null, params);
	}
};
