/**
 * egyszerű 'if' taszk elágazások megvalósításához.
 * @author sarkiroka
 */
module.exports = function (conditionTask, trueTask, elseTask) {
	return function (params, callback) {
		conditionTask(params, function (err, ifparams) {
			if (err) {
				callback(err, params);
			} else if (ifparams.ifresult) {//true branch
				if (trueTask) {
					trueTask(params, callback);
				} else {
					callback(null, params);
				}
			} else {
				if (elseTask) {//else branch
					elseTask(params, callback);
				} else {//no else branch
					callback(null, params);
				}
			}
		});
	}
};
