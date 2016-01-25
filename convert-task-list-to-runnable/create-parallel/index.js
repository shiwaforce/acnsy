/**
 * konvertálja a parallel taszkokat és visszatér a futtatójukkal
 * @author sarkiroka
 */
var createRunner = require('./create-runner');
var convertTask = require('./convert-task');
module.exports = function (tasks) {
	tasks.forEach(function (element, index, array) {
		array[index] = convertTask(element);
	});
	return createRunner(tasks);
};
