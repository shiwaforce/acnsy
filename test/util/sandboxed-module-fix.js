var EXCLUDES_REGEX = /(?:node_modules|fix)/;
module.exports = function (source) {
	var coverageVariable,
		istanbulCoverageMayBeRunning = false,
		excludeFromCoverageMeasure = false;

	Object.keys(global).forEach(function (name) {
		if ((name.indexOf("$$cov_") === 0 || name === '__coverage__') && global[name]) {
			istanbulCoverageMayBeRunning = true;
			coverageVariable = name;
		}
	});
	if (this.filename.match(EXCLUDES_REGEX)) {
		excludeFromCoverageMeasure = true;
	}

	if (istanbulCoverageMayBeRunning && !excludeFromCoverageMeasure) {
		try {
			var istanbul = require('istanbul'),
				instrumenter = new istanbul.Instrumenter({coverageVariable: coverageVariable}),
				instrumentMethod = instrumenter.instrumentSync.bind(instrumenter);
			source = instrumentMethod(source, this.filename);
		} catch (e) {
		}
	}
	return source;
};
