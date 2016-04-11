/**
 * create a sandboxed module from the original source
 * @author sarkiroka
 */
var path = require('path');
var istanbulSourceCodeTransformerFix = require('./sandboxed-module-fix');
var sandboxedModule = require('sandboxed-module');
module.exports = function (filename) {
	if (typeof filename != 'string') {
		throw new Error('must specify the name of the test-file');
	}
	var originalFilename = filename.replace(/(?:\/|\\)test(?:\/|\\)unit(?:\/|\\)/, path.sep);
	return function (options) {
		options = options || {};
		options.sourceTransformers = options.sourceTransformers || {};
		if (!options.sourceTransformers['no-node_modules-transforming-required']) {
			options.sourceTransformers['no-node_modules-transforming-required'] = istanbulSourceCodeTransformerFix
		}
		return sandboxedModule.require(originalFilename, options);
	};
};
