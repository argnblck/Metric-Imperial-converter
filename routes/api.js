'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = String(req.query.input);

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);


    if (!initNum && !initUnit) {
      res.send('invalid number and unit');
      return;
    }
    if (!initNum) {
      res.send('invalid number');
      return;
    }
    if (!initUnit) {
      res.send('invalid unit');
      return;
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);

    const fullNameInitUnit = convertHandler.spellOutUnit(initUnit);
    const fullNameReturnUnit = convertHandler.spellOutUnit(returnUnit);

    const string = convertHandler.getString(initNum, fullNameInitUnit, returnNum, fullNameReturnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    })
  });
};
