/**
 * @author sarkiroka on 2016.04.25.
 */
module.exports = function wrongPassword(params, callback) {
	params.ifResult = params.magic != params.incoming;
	callback(null, params);
};
