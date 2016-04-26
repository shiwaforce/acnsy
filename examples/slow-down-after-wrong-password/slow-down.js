/**
 * @author sarkiroka on 2016.04.25.
 */
module.exports = function slowDown(params, callback) {
	setTimeout(callback, params.delayOnWrongPassword, null, params);
};
