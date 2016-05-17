/**
 * @author sarkiroka on 2016.03.29.
 */
var getType = require('../common/get-type');
var runParallel = require('./run-parallel');
var setImmediate = require('../common/get-immediate');
module.exports = function serial(params, tasks, end) {
	var maxIndex = tasks.length;
	var err = null;
	var stack = [];

	function doNext(taskIndex) {
		var retValue = null;
		if (err || taskIndex >= maxIndex) {
			end(err, params);
			retValue = new Function();//nothing to do after end
		} else {
			var nextTask = tasks[taskIndex];
			var typeOfNextTask = getType(nextTask);
			if (typeOfNextTask == 'function') {//serial
				var timeoutMillisec = 3000;
				if (typeof nextTask.timeout == 'number') {
					timeoutMillisec = nextTask.timeout;
				}
				retValue = function (p, c) {
					var notTimeoutedYet = true;
					var timeoutId = setTimeout(function () {
						notTimeoutedYet = false;
						c({name: 'timeout'}, p);
					}, timeoutMillisec);
					nextTask(p, function (e, px) {
						stack.push(nextTask.name ? nextTask.name : nextTask.toString().substring(0, 100));
						if (notTimeoutedYet) {
							clearTimeout(timeoutId);
							c(e, px)
						}
					});
				}
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
			if (taskErr) {
				if (!err) {
					err = {};
				}
				if (!err.originals) {
					err.originals = [];
				}
				if (!err.stack) {
					err.stack = [];
				}
				if (taskErr.originals && taskErr.stack) {
					err.originals = err.originals.concat(taskErr.originals);
					err.stack = err.stack.concat(taskErr.stack);
				} else {
					err.originals.push(taskErr);
					err.stack = stack;
				}
			}
			doAsync(index + 1);
		});
	}

	doAsync(0);
};
