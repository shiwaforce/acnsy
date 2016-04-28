/**
 * summarize all of content
 * @author sarkiroka on 2016.04.18.
 */
module.exports = function summarize(params, callback) {
	params.contents.forEach(function (content) {
		params.result += content;
	});
	callback(null, params);
};
