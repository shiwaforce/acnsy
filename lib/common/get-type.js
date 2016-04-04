/**
 * @author sarkiroka on 2016.03.28.
 */
module.exports = function (variable) {
	var type = Object.prototype.toString.call(variable);
	type = type.toLowerCase();
	type = type.substr(8);//remove "[object " prefix
	type = type.substr(0, type.length - 1);//remove "]" postfix
	return type;
};
