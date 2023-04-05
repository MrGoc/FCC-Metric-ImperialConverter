function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    let num = input;
    //let index = /[a-z]/i.exec(input).index;
    let char = num.match("[a-zA-Z]");
    let index = -1;
    if (char !== null) index = str.indexOf(char);

    if ((index = -1)) num = input;
    else num = input.substring(0, index);

    if (num.includes("./")) result = "invalid number";
    else if (num.includes("/")) {
      let nums = num.split("/");
      if (nums.length !== 2) result = "invalid number";
      else {
        if (isNaN(nums[0]) || isNaN(nums[1])) result = "invalid number";
        else result = +nums[0] / +nums[1];
      }
    } else {
      if (isNaN(num)) result = "invalid number";
      else result = +num;
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;

    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    return result;
  };
}

module.exports = ConvertHandler;
