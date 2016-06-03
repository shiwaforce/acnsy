/**
 * @author sarkiroka on 2016.04.20.
 */
var checkImportantSites = require('./check-important-sites/index');
var slowDownAfterWrongPassword = require('./slow-down-after-wrong-password/index');
var sumOfFiles = require('./sum-of-files/index');

var rAsync = require('../index_v2');

rAsync({}, [
	checkImportantSites,
	slowDownAfterWrongPassword,
	sumOfFiles
], function (a, b) {/*console.log(1212,a,b)*/
});
