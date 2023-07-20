const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
	suite('Input numbers', function () {
		test('whole number input', function () {
			assert.strictEqual(convertHandler.getNum('12km'), 12);
		});
		test('decimal number input', function () {
			assert.strictEqual(convertHandler.getNum('18.5km'), 18.5);
		});
		test('fractional input', function () {
			assert.strictEqual(convertHandler.getNum('6/3km'), 2);
		});
		test('fractional input with a decimal', function () {
			assert.strictEqual(convertHandler.getNum('18.3/5km'), 3.66);
		});
		test('invalid double-fraction input (i.e. 3/2/3).', function () {
			assert.strictEqual(convertHandler.getNum('3/km'), undefined);
			assert.strictEqual(convertHandler.getNum('3/5/km'), undefined);
		});
		test('no numerical input', function () {
			assert.strictEqual(convertHandler.getNum('km'), 1);
		});

	})
	suite('Units', function () {
		test('valid input unit', function () {
			assert.strictEqual(convertHandler.getUnit('12kM'), 'km');
			assert.strictEqual(convertHandler.getUnit('12Mi'), 'mi');
			assert.strictEqual(convertHandler.getUnit('12LBS'), 'lbs');
			assert.strictEqual(convertHandler.getUnit('12l'), 'L');
			assert.strictEqual(convertHandler.getUnit('12KG'), 'kg');
			assert.strictEqual(convertHandler.getUnit('12Gal'), 'gal');
		});
		test('invalid input unit', function () {
			assert.strictEqual(convertHandler.getUnit('3ksm'), undefined);
			assert.strictEqual(convertHandler.getUnit('3ma'), undefined);
			assert.strictEqual(convertHandler.getUnit('3'), undefined);
			assert.strictEqual(convertHandler.getUnit('3kilo'), undefined);
			assert.strictEqual(convertHandler.getUnit('3litres'), undefined);
		});
		test('return unit for each valid input unit.', function () {
			assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
			assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
			assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
			assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
			assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
			assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
		});
		test('spelled-out string unit for each valid input unit', function () {
			assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
			assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
			assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
			assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
			assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
			assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
		});
	})
	suite('Converts', function () {
		test('convert gal to L', function () {
			assert.strictEqual(convertHandler.convert(1, 'gal'), 3.78541);
		})
		test('convert lbs to kg', function () {
			assert.strictEqual(convertHandler.convert(1, 'lbs'), 0.45359);
		})
		test('convert mi to km', function () {
			assert.strictEqual(convertHandler.convert(1, 'mi'), 1.60934);
		})
		test('convert L to gal', function () {
			assert.strictEqual(convertHandler.convert(1, 'L'), 0.26417);
		})
		test('convert km to mi', function () {
			assert.strictEqual(convertHandler.convert(1, 'km'), 0.62137);
		})
		test('convert kg to lbs', function () {
			assert.strictEqual(convertHandler.convert(1, 'kg'), 2.20462);
		})
	})
});