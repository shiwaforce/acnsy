/**
 * @author sarkiroka on 2016.04.13.
 */
var getType = require('../common/get-type');
module.exports = function validateTaskList(tasks, deep) {
	if (!deep) {
		throw new Error('acnsy error: too deep task signature.');
	}
	for (var i = 0; i < tasks.length; i++) {
		var task = tasks[i];
		var typeOfTask = getType(task);
		if (typeOfTask != 'function') {
			if (typeOfTask == 'array') {
				validateTaskList(task, deep - 1);
			} else {
				throw new Error('acnsy error: the task is not a function or an array');
			}
		} else {//this is a task (function)
			if (!task.name) {
				console.warn('if you use an unnamed function then loose the stack of tasknames. (' + task.toString() + ')');
			}
		}
	}
};
