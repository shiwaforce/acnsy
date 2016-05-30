/**
 * list the files in a folder to an array
 * @author sarkiroka on 2016.04.18.
 */
var fs = require('fs');
var path = require('path');
module.exports = function getListOfFiles(params, callback) {
	var folder = path.normalize(path.join(__dirname, path.sep, params.folder));
	fs.readdir(folder, function (err, files) {
		if(!err && Object.prototype.toString.call(files)=='[object Array]') {
			params.files = files.map(function (filename) {
				return path.join(folder, filename);
			});
		}
		callback(err, params);
	})
};
