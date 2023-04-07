function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    let num = input;
    //let index = /[a-z]/i.exec(input).index;
    let char = num.match("[a-zA-Z]");
    let index = -1;
    if (char !== null) index = num.indexOf(char);

    if (index === -1) num = input;
    else num = input.substring(0, index);

    if (num.includes("./")) result = "invalid number";
    else if (num.includes("/")) {
      let nums = num.split("/");
      if (nums.length !== 2) result = "invalid number";
      else {
        if (isNaN(nums[0]) || isNaN(nums[1])) result = "invalid number";
        else result = +nums[0] / +nums[1];
      }
    } else if (num === "") {
      result = 1;
    } else {
      if (isNaN(num)) result = "invalid number";
      else result = +num;
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;
    let index = -1;
    let units = ["gal", "L", "mi", "km", "lbs", "kg"];
    let char = input.match("[a-zA-Z]");
    if (char !== null) index = input.indexOf(char);

    if (index === -1) result = "invalid unit";
    else {
      result = input.substring(index, input.length);
      index = units.findIndex(
        (el) => el.toLowerCase() === result.toLowerCase()
      );
      if (index === -1) result = "invalid unit";
      else if (result.toLowerCase() === "l") result = "L";
      else result = result.toLowerCase();
    }

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let units = ["gal", "L", "mi", "km", "lbs", "kg"];
    let retUnits = ["L", "gal", "km", "mi", "kg", "lbs"];
    let ix = units.findIndex(
      (el) => el.toLowerCase() === initUnit.toLowerCase()
    );
    let result;
    if (ix === -1) result = "invalid unit";
    else result = retUnits[ix];

    return result;
  };

  this.spellOutUnit = function (unit) {
    let spells = [
      ["gal", "gallons"],
      ["L", "liters"],
      ["mi", "miles"],
      ["km", "kilometers"],
      ["lbs", "pounds"],
      ["kg", "kilograms"],
    ];
    let ix = spells.findIndex(
      (el) => el[0].toLowerCase() === unit.toLowerCase()
    );
    let result;
    if (ix === -1) result = "invalid unit";
    else result = spells[ix][1];

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    const roundAccurately = (number, decimalPlaces) =>
      Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces);

    switch (initUnit.toLowerCase()) {
      case "gal":
        result = roundAccurately(initNum * galToL, 5);
        break;
      case "l":
        result = roundAccurately(initNum / galToL, 5);
        break;
      case "lbs":
        result = roundAccurately(initNum * lbsToKg, 5);
        break;
      case "kg":
        result = roundAccurately(initNum / lbsToKg, 5);
        break;
      case "mi":
        result = roundAccurately(initNum * miToKm, 5);
        break;
      case "km":
        result = roundAccurately(initNum / miToKm, 5);
        break;
      default:
        result = "invalid unit";
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let initUnitSpellOut = this.spellOutUnit(initUnit);
    let returnUnitSpellOut = this.spellOutUnit(returnUnit);
    let result = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string:
        initNum +
        " " +
        initUnitSpellOut +
        " converts to " +
        returnNum +
        " " +
        returnUnitSpellOut,
    };

    return result;
  };
}

module.exports = ConvertHandler;
