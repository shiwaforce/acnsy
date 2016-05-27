/**
 * egyszerű 'each' taszk ciklusok megvalósításához.
 * @author sarkiroka
 */
module.exports = function (arrayOrContinueTask, eachTask) {
	return function (params, callback) {
		if(typeof arrayOrContinueTask=='function'){
			arrayOrContinueTask(params, function(err, params){

			});
		}else if(Object.prototype.toString.call(arrayOrContinueTask)=='[object Array]'){

		}else{

		}
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
