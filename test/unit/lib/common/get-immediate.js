require('expectations');
var getTestfile = require('../../../util/get-testfile')(__filename);
describe('get-immediate common module', function () {
	it('returns the original setImmediate function if it present', function () {
		var mockImmediate = new Function();
		var testfile = getTestfile({
			globals: {
				setImmediate: mockImmediate
			},
			requires: {
				'./simulated-immediate': sinon.stub().returns(42)
			}
		});
		expect(testfile).toEqual(mockImmediate, 'should use the original immediate function if it exists');
	});

	it('returns the simulated setImmediate function if native is not present', function () {
		var simulatedImmediate = 42;
		var testfile = getTestfile({
			globals: {
				setImmediate: undefined
			},
			requires: {
				'./simulated-immediate': simulatedImmediate
			}
		});
		expect(testfile).toEqual(simulatedImmediate, 'should use the simulated immediate function if native is not exists');
	});
});
