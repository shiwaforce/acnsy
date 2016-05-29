/**
 * @author sarkiroka on 2016.04.18.
 */
var getContentOfAFile = require('./get-content-of-a-file');
var getListOfFiles = require('./get-list-of-files');
var acnsy = require('../../index_v2');
var summarize = require('./summarize');
module.exports = function sumOfFilesExample(outerParams,callback) {
	acnsy({
		folder: './data',
		result: 0
	}, [
		getListOfFiles,
		acnsy.each('files', getContentOfAFile),
		summarize
	], function (err, params) {
		console.log('the result is', params.result, '- error is', err);
		callback(err,outerParams);
	});
};
