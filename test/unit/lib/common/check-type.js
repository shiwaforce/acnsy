require('expectations');
var testfile = require('../../../../lib/common/check-type');
describe('check type', function () {
	var matches = ['string', 'String', 'sTRING', 'StRiNg'];
	matches.forEach(function (type) {
		it('handles "' + type + '" parameter', function () {
			var result = testfile('', type);
			expect(typeof result).toEqual('boolean', 'should produce a boolean value - the check result');
			expect(result).toEqual(true, 'should produce true for "' + type + '"');
		});
	});
	var notMatches = [' string', ' string ', 'string ', '.string', '\0string', 'string\0', 'string\x00', '\x00string'];
	notMatches.forEach(function (type) {
		it('handles "' + type + '" parameter', function () {
			var result = testfile('', type);
			expect(typeof result).toEqual('boolean', 'should produce a boolean value - the check result');
			expect(result).toEqual(false, 'should produce true for "' + type + '"');
		});
	});
});
