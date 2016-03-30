/**
 * @author sarkiroka on 2016.03.28.
 */
module.exports = function (variable) {
	var string = (variable + '');
	return string.charAt(0).toUpperCase() + string.slice(1);
};
