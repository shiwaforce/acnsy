/**
 * @author sarkiroka on 2016.04.25.
 */
var acnsy = require('../../index_v2');
var slowDown = require('./slow-down');
var wrongPassword = require('./wrong-password');
module.exports = function slowDownAfterWrongPasswordExample(outerParams, callback) {
	slowDown.timeout = 5000;
	acnsy({
		delayOnWrongPassword: 3000,
		incoming: outerParams.password,//maybe undefined
		magic: 'P4ssw0rd',
		startTime: Date.now()
	}, [
		acnsy.if(wrongPassword, slowDown)
	], function (err, params) {
		var now = Date.now();
		var elapsed = now - params.startTime;
		console.log('the password is ' + (params.ifResult ? 'incorrect' : 'correct') + ', elapsed', elapsed);
		callback(err, outerParams);
	})
};
