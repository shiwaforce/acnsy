/**
 * elkészíti a paraméterátadó elsődleges taszkot
 * @author sarkiroka
 */
module.exports = function (param) {
	return function (callback) {
		callback(null, param);
	}
};
