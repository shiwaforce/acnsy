/**
 * visszaadja a setImmediate függvényt ha létezik, ellenkező esetben az azt szimuláló kódot
 * @author sarkiroka on 2016.05.12.
 */
var simulatedImmediate = require('./simulated-immediate');
var immediateFunction = setImmediate;
if (typeof immediateFunction != 'function') {
	immediateFunction = simulatedImmediate;
}
module.exports = immediateFunction;
