function ConvertHandler() {

  const units = {
    km: 'mi',
    mi: 'km',
    L: 'gal',
    gal: 'L',
    kg: 'lbs',
    lbs: 'kg'
  }

  const unitsMap = {
    gal: 'gallons',
    L: 'liters',
    mi: 'miles',
    km: 'kilometers',
    lbs: 'pounds',
    kg: 'kilograms'
  }

  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  const conversionRate = {
    gal: galToL,
    L: 1 / galToL,
    mi: miToKm,
    km: 1 / miToKm,
    lbs: lbsToKg,
    kg: 1 / lbsToKg
  }

  this.getNum = function (input) {
    let result = input.match(/[\d\/.]+/g) || ['1'];
    const nums = result.join('').split('/');
    if (nums.length > 2) {
      return undefined;
    }
    if (nums[1] === '') {
      return undefined;
    }
    const num1 = nums[0];
    const num2 = nums[1] || '1'
    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    result = parseFloat(num1) / parseFloat(num2)

    return result;
  };

  this.getUnit = function (input) {
    const regExp = /[A-Za-z]/
    const idx = input.split('').findIndex(char => regExp.test(char));
    if (idx < 0) {
      return undefined;
    }
    let unit = input.slice(idx).toLowerCase();
    if (unit === 'l') {
      unit = 'L';
    }
    if (!units.hasOwnProperty(unit)) {
      return undefined;
    } else {
      return unit;
    }
  };

  this.getReturnUnit = function (initUnit) {
    const result = units[initUnit];

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result = unitsMap[unit]

    return result;
  };

  this.convert = function (initNum, initUnit) {

    let result = conversionRate[initUnit] * initNum;

    return Number(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
    return result;
  };

}

module.exports = ConvertHandler;
