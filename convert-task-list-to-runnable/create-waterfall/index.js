/**
 * elkészíti a waterfall-t a kapott taszkokból
 * @author sarkiroka
 */
var convertTask = require('./convert-task');
var createRunner = require('./create-runner');
module.exports = function (tasks, end) {
	tasks.forEach(function (element, index, array) {
		array[index] = convertTask(element);
	});
	return createRunner(tasks, end);
};
