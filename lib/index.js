/**
 * @author sarkiroka on 2016.03.29.
 */
var serial=require('./acnsy/run-serial');
module.exports = function (preparedArguments) {
	serial(preparedArguments.params, preparedArguments.tasks, preparedArguments.end);
};
