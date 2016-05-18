/**
 * @author sarkiroka on 2016.03.29.
 */
var getType = require('../common/get-type');
var setImmediate = require('../common/get-immediate');
module.exports = function (params, tasks, end) {
	var runSerial = require('./run-serial');//warning - maybe circular dependency
	var remainingTasks = tasks.length;
	var err = null;
	var stack = [];

	function endOfParallelTask(taskErr, p) {
		remainingTasks--;
		if (taskErr) {
			if (!err) {
				err = {originals: [], stack: stack};
			}
			if (taskErr.originals && taskErr.stack) {
				err.originals = err.originals.concat(taskErr.originals);
				err.stack = err.stack.concat(taskErr.stack);
			} else {
				err.originals.push(taskErr);
			}
		}
		if (remainingTasks == 0) {//or timeout
			end(err, params);
		}
	}

	tasks.forEach(function (task) {
		if (getType(task) == 'function') {//parallel
			setImmediate(function (p, c) {
				var notTimeoutedYet = true;
				var timeoutMillisec = 3000;
				if (typeof task.timeout == 'number') {
					timeoutMillisec = task.timeout;
				}
				var timeoutId = setTimeout(function () {
					notTimeoutedYet = false;
					c({name: 'timeout'}, p);
				}, timeoutMillisec);
				task(p, function (e, px) {
					stack.push(task.name ? task.name : task.toString().substring(0, 100));
					clearTimeout(timeoutId);
					if (notTimeoutedYet) {
						c(e, px)
					}
				});
			}, params, endOfParallelTask);
		} else {//serial
			runSerial(params, task, endOfParallelTask)
		}
	})
};
