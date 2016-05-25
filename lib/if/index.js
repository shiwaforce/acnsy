/**
 * @author sarkiroka on 2016.04.25.
 */
var getType = require('../common/get-type');
var noop = require('../noop/index');
module.exports = function (conditionTask, trueBranch, elseBranch) {
	if (getType(conditionTask) != 'function') {
		throw new Error('acnsy error: condition task must be a function');
	}
	if ((trueBranch && getType(trueBranch) != 'function') || (elseBranch && getType(elseBranch) != 'function')) {
		throw new Error('acnsy error: the branches tasks (both of trueBranch and elseBranch) must be tasks or falsy (null/undefined/false/0)');
	}
	if (!trueBranch) {
		trueBranch = noop;
	}
	if (!elseBranch) {
		elseBranch = noop;
	}
	return function ifTask(params, callback) {
		var conditionTimedOut = false;
		var conditionTimeout = 3000;
		if (typeof conditionTask.timeout == 'number') {
			conditionTimeout = conditionTask.timeout;
		}
		var conditionTimeoutId = setTimeout(function () {
			conditionTimedOut = true;
			callback({name: 'timeout'}, params);
		}, conditionTimeout);
		conditionTask(params, function (err, result) {
			if (conditionTimedOut) {
				return;
			}
			clearTimeout(conditionTimeoutId);
			if (err) {
				callback(err, result);
			} else {
				var branchTimedOut = false;
				var branchTimeout = 3000;
				var branch;
				if (result.ifResult) {
					branch = trueBranch;
				} else {
					branch = elseBranch;
				}
				if (typeof branch.timeout == 'number') {
					branchTimeout = branch.timeout;
				}
				var branchTimeoutId = setTimeout(function () {
					branchTimedOut = true;
					callback({name: 'timeout'}, params);
				}, branchTimeout);
				branch(params, function (err, params) {
					if (branchTimedOut) {
						return;
					}
					clearTimeout(branchTimeoutId);
					callback(err, params);
				})
			}
		});
	};
};
