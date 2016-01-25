/**
 * konvertálja a waterfall taszkokat és visszatér a futtatójukkal
 * @author sarkiroka
 */
var createWaterfall = require('./create-waterfall');
module.exports = function convertTaskListToRunnable(initialTask, tasks, end) {
	var waterfallTasks = [initialTask].concat(tasks);
	return createWaterfall(waterfallTasks, end);
};
