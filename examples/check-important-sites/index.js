/**
 * @author sarkiroka on 2016.05.03.
 */
var checkASite = require('./check-a-site');
var rAsync = require('../../index_v2');
var readConfig = require('./read-config');
module.exports = function checkImportantSites(outerParams, callback) {
	rAsync({
		configPath: './config.json',
		rawResult: {},
		result: ""
	}, [
		readConfig,
		rAsync.each('sites', checkASite),
		//formatReport
	], function (err, params) {
		console.log('the result is', params.result, '- error is', err);
		callback(err, outerParams);
	});
};
