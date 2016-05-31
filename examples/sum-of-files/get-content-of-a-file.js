/**
 * read a content of a specified file
 * @author sarkiroka on 2016.04.18.
 */
var fs = require('fs');
module.exports = function (params, callback) {
	params.contents = params.contents || [];
	var filename = this.item;
	fs.readFile(filename, function (err, content) {//each populate the "_item" propery for each task call
		if (!err) {
			try {
				var number = parseInt(content, 10);
				if (isNaN(number)) {
					throw new TypeError('"' + content + '" is not a number (in file ' + filename + ')');
				}
				params.contents.push(number);
			} catch (e) {
				err = e;
			}
		}
		callback(err, params);
	});
};
