/**
 * végrehajtja a taszkokat a definiált soros-párhuzamos mód szerint, végül meghívja az end-et
 * @author sarkiroka
 */
var createInitialTask = require('./create-initial-task');
var convertTaskListToRunnable = require('./convert-task-list-to-runnable');
module.exports = function (initialArguments, tasks, end) {
	if (typeof initialArguments == 'function') {
		end = tasks;
		tasks = initialArguments;
		initialArguments = {};
	}
	var initialTask = createInitialTask(initialArguments);
	var runnable = convertTaskListToRunnable(initialTask, tasks, end);
	runnable();
};
