/**
 * possible call signatures
 *    acnsy({}, [], fn) - initial parameters, tasks, endtask
 *    acnsy({}, []) - initial parameters, tasks
 *    acnsy([], fn) - tasks, endtask
 *    acnsy([]) - tasks
 * @author sarkiroka on 2016.03.28.
 */
const MAXIMUM_DEEP_OF_TASKS = 1980;
var createSafeParameters = require('./create-safe-parameters');
var getType = require('./../common/get-type');
var validateTaskList = require('./validate-task-list');
module.exports = function (initialParams, taskList, endFunction) {
	var retValue = null;
	var types = [getType(initialParams), getType(taskList), getType(endFunction)].join(',');
	switch (types) {
		case 'array,undefined,undefined':
			retValue = createSafeParameters({}, initialParams, new Function());
			break;
		case 'array,function,undefined':
			retValue = createSafeParameters({}, initialParams, taskList);
			break;
		case 'object,array,undefined':
			retValue = createSafeParameters(initialParams, taskList, new Function());
			break;
		case 'object,array,function':
			retValue = createSafeParameters(initialParams, taskList, endFunction);
			break;
		default:
			throw new Error('acnsy error: Invalid signature found. The first argument must be an object (for initial arguments, when this case, the next argument must be an array (for tasklist)) or an array (for tasklist). The last argument may a function. But got "' + types + '"\r\n' +
				'Use one of these signatures:\r\n' +
				'(object, array, function)' +
				'(object, array)' +
				'(array, function)' +
				'(array)');
	}
	if (retValue) {
		validateTaskList(retValue.tasks, MAXIMUM_DEEP_OF_TASKS);
	}
	return retValue;
};
