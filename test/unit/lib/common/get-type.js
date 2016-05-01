require('expectations');
var testfile = require('../../../../lib/common/get-type');
describe('get type', function () {
	var values = {
		null: {value: null, type: 'null'},
		zero: {value: 0, type: 'number'},
		number: {value: 42, type: 'number'},
		negative: {value: -42, type: 'number'},
		float: {value: 1e3, type: 'number'},
		emptyString: {value: '', type: 'string'},
		string: {value: 'sarkiroka', type: 'string'},
		emptyObject: {value: {}, type: 'object'},
		filledObject: {value: {a: 42}, type: 'object'},
		emptyArray: {value: [], type: 'array'},
		filledArray: {value: [1, 2, 3], type: 'array'},
		true: {value: true, type: 'boolean'},
		false: {value: false, type: 'boolean'},
		regex: {value: /regex/, type: 'regexp'},
		function: {value: new Function(), type: 'function'},
		date: {value: new Date(), type: 'date'},
		undefined: {type: 'undefined'}
	};
	for (var name in values) {
		(function (name) {
			it('handles "' + name + '" parameter', function () {
				var item = values[name];
				var result = testfile(item.value);
				expect(typeof result).toEqual('string', 'should produce a string - type name');
				expect(result).toEqual(item.type, 'should give "' + item.type + '" for value ' + item.value);
			});
		})(name);
	}
});
