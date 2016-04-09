require('expectations');
var testfile = require('../../../../lib/common/capitalize-first-letter');
describe('capitalize first letter', function () {
	var values = {
		null: null,
		zero: 0,
		number: 42,
		negative: -42,
		emptyString: '',
		string: 'sarkiroka',
		object: {},
		true: true,
		false: false
	};
	var types = Object.keys(values);
	types.push('undefined');
	types.forEach(function (type) {
		it('handles "' + type + '" parameter', function () {
			var result = testfile(values[type]);
			expect(typeof result).toEqual('string', 'should create a capitalized string from ' + type);
		});
	});

	it('handles simple strings', function () {
		var result = testfile('sarkiroka');
		expect('Sarkiroka').toEqual(result);
	});

	it('handles capitalized strings', function () {
		var result = testfile('Sarkiroka');
		expect('Sarkiroka').toEqual(result);
	});

	it('handles camelCase strings', function () {
		var result = testfile('sarkiRoka');
		expect('SarkiRoka').toEqual(result);
	});
});
