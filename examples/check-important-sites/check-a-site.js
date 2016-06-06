/**
 * @author sarkiroka on 2016.05.03.
 */
module.exports = function (params, callback) {
	var siteDescriptor = this.item;
	console.log(siteDescriptor);
	callback(null, params);
};
