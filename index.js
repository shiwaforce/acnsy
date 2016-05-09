/**
 * végrehajtja a taszkokat a definiált soros-párhuzamos mód szerint, végül meghívja az end-et
 * @author sarkiroka
 */
var createInitialTask = require('./create-initial-task');
var convertTaskListToRunnable = require('./convert-task-list-to-runnable');
var ifTask = require('./if-task');
var eachTask = require('./each-task');

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
module.exports.ifTask = ifTask;
module.exports.if = ifTask;
module.exports.each = eachTask;
