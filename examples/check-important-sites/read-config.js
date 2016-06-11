/**
 * reads the config
 * @author sarkiroka on 2016.05.03.
 */
module.exports = function readConfig(params, callback) {
	delete require.cache[require.resolve(params.configPath)];
	try {
		var config = require(params.configPath);//if we are use fs for read the file, we must call the callback in the callback of fs function. the require is synchron
		params.sites = config.sites;
		params.tresholds = config.tresholds;
		callback(null, params);
	} catch (e) {
		callback(e, params);
	}
};
