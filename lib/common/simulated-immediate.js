/**
 * visszatér egy setImmediate működését nagyjából szimuláló függvénnyel
 * @author sarkiroka on 2016.05.12.
 */
const SIMULATED_IMMEDIATE_TIMEOUT = 1;
module.exports = function () {
	var args = [arguments[0], SIMULATED_IMMEDIATE_TIMEOUT];
	for (var i = 1; i < arguments.length; i++) {
		args.push(arguments[i]);
	}
	setTimeout.apply(null, args);
};
