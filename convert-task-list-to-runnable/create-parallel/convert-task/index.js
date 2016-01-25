/**
 * konvertál egy taszkot paralell task-ká
 * @author sarkiroka
 */
module.exports = function (task) {
	var createWaterfall = require('../../create-waterfall');
	var retValue;
	if (typeof task == 'function') {
		(function (task) {
			retValue = task;
		})(task);
	} else if (typeof task == 'object' && task.length > 0) {
		retValue = function (params, callback) {
			var waterfallTasks = [function (callback) {
				callback(null, params);
			}].concat(task);
			createWaterfall(waterfallTasks, function (err, result) {
				callback(null, result);
			})();
		};
	} else {
		throw new Error('parallel task error: ' + typeof task);
	}
	return retValue;
};
