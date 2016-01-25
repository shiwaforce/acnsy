/**
 * a kapott user taszkot átkonvertálja waterfall task-ká
 * @author sarkiroka
 */
var createParallel = require('../../create-parallel');
module.exports = function (task) {
	var retValue;
	if (typeof task == 'function') {
		retValue = task;
	} else if (typeof task == 'object' && task.length > 0) {
		retValue = createParallel(task);
	} else {
		throw new Error('waterfall task error');
	}
	return retValue;
};
