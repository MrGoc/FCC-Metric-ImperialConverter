"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  app.route("/api/convert").get((req, res) => {
    let convertHandler = new ConvertHandler();
    let initUnit = convertHandler.getUnit(req.query.input);
    let initNum = convertHandler.getNum(req.query.input);
    if (initNum === "invalid number" && initUnit === "invalid unit")
      res.send("invalid number and unit");
    else if (initNum === "invalid number") res.send(initNum);
    else if (initUnit === "invalid unit") res.send(initUnit);
    else {
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let returnNum = convertHandler.convert(initNum, initUnit);
      res.send(
        convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
      );
    }
  });
};
