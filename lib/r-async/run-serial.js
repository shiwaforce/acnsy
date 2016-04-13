/**
 * @author sarkiroka on 2016.03.29.
 */
if (typeof setImmediate != 'function') {
	setImmediate = function () {
		setTimeout(arguments[0], 1, arguments[1], arguments[2]);
	}
}
var getType = require('../common/get-type');
var runParallel = require('./run-parallel');
module.exports = function serial(params, tasks, end) {
	var maxIndex = tasks.length;
	var err = null;

	function doNext(taskIndex) {
		var retValue = null;
		if (err || taskIndex >= maxIndex) {
			end(err, params);
			retValue = new Function();//nothing to do after end
		} else {
			var nextTask = tasks[taskIndex];
			var typeOfNextTask = getType(nextTask);
			if (typeOfNextTask == 'function') {//serial
				retValue = nextTask;
			} else {//parallel
				retValue = function (params, callback) {//this is a wrapper for parallel tasks
					runParallel(params, nextTask, callback);
				};
			}
		}
		return retValue;
	}

	function doAsync(index) {
		setImmediate(doNext(index), params, function (taskErr, p) {
			err = taskErr;
			doAsync(index + 1);
		});
	}

	doAsync(0);
};
