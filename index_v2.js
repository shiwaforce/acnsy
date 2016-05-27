/**
 * possible call signatures
 *    acnsy({}, [], fn)
 *    acnsy({}, [])
 *    acnsy([], fn)
 *    acnsy([])
 * @author sarkiroka on 2016.03.28.
 */
var each = require('./lib/each/index');
var ifTask = require('./lib/if/index');
var noop = require('./lib/noop/index');
var prepareArguments = require('./lib/prepare-arguments/index');
var acnsy = require('./lib/index');
module.exports = function (initialParams, taskList, end) {
	var preparedParameters = prepareArguments(initialParams, taskList, end);
	acnsy(preparedParameters);
};
module.exports.each = each;
module.exports.if = ifTask;
module.exports.noop = noop;
