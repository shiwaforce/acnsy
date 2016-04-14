/**
 * possible call signatures
 *    rAsync({}, [], fn) - initial parameters, tasks, endtask
 *    rAsync({}, []) - initial parameters, tasks
 *    rAsync([], fn) - tasks, endtask
 *    rAsync([]) - tasks
 * @author sarkiroka on 2016.03.28.
 */
var getType = require('./../common/get-type');
var validateTaskList = require('./validate-task-list');
const MAXIMUM_DEEP_OF_TASKS = 1980;
module.exports = function (initialParams, taskList, endFunction) {
	var params = null;
	var tasks = null;
	var end = null;
	var types = [getType(initialParams), getType(taskList), getType(endFunction)].join(',');
	switch (types) {
		case 'array,undefined,undefined':
			params = {};
			tasks = initialParams;
			end = new Function();
			break;
		case 'array,function,undefined':
			params = {};
			tasks = initialParams;
			end = endFunction;
			break;
		case 'object,array,undefined':
			params = initialParams;
			tasks = taskList;
			end = new Function();
			break;
		case 'object,array,function':
			params = initialParams;
			tasks = taskList;
			end = endFunction;
			break;
		default:
			throw new Error('Invalid signature found. The first argument must be an object (for initial arguments, when this case, the next argument must be an array (for tasklist)) or an array (for tasklist). The last argument may a function.  But got "' + getType(initialParams) + '", "' + getType(taskList) + '", "' + getType(end) + '"');
	}
	validateTaskList(tasks, MAXIMUM_DEEP_OF_TASKS);
	return {
		params: params,
		tasks: tasks,
		end: end
	};
};
