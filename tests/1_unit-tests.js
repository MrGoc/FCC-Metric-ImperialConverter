const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Whole number input", function () {
    assert.equal(convertHandler.getNum("3gal"), 3);
    assert.equal(convertHandler.getNum("15l"), 15);
    assert.equal(convertHandler.getNum("32km"), 32);
  });
  test("Decimal number input", function () {
    assert.equal(convertHandler.getNum("3.1gal"), 3.1);
    assert.equal(convertHandler.getNum("4.536mi"), 4.536);
    assert.equal(convertHandler.getNum("88.01l"), 88.01);
  });
  test("Fractional input", function () {
    assert.equal(convertHandler.getNum("4/2gal"), 2);
    assert.equal(convertHandler.getNum("10/2km"), 5);
    assert.equal(convertHandler.getNum("30/3mi"), 10);
  });
  test("Fractional input with a decimal", function () {
    assert.equal(convertHandler.getNum("2.5/2gal"), 1.25);
    assert.equal(convertHandler.getNum("4.5/3L"), 1.5);
    assert.equal(convertHandler.getNum("10.5/3.2mi"), 3.28125);
  });
  test("Invalid input on a double-fraction", function () {
    assert.equal(convertHandler.getNum("2.5/2/2gal"), "invalid number");
    assert.equal(convertHandler.getNum("3/2/2mi"), "invalid number");
    assert.equal(convertHandler.getNum("2.5/2.3/1.2km"), "invalid number");
  });
  test("No Numerical Input", function () {
    assert.equal(convertHandler.getNum("gal"), 1);
    assert.equal(convertHandler.getNum("km"), 1);
    assert.equal(convertHandler.getNum("mi"), 1);
  });

  test("Valid input unit", function () {
    assert.equal(convertHandler.getUnit("3gal"), "gal");
    assert.equal(convertHandler.getUnit("15km"), "km");
    assert.equal(convertHandler.getUnit("33l"), "L");
    assert.equal(convertHandler.getUnit("45mi"), "mi");
    assert.equal(convertHandler.getUnit("Lbs"), "lbs");
  });
  test("Invalid input unit", function () {
    assert.equal(convertHandler.getUnit("3al"), "invalid unit");
    assert.equal(convertHandler.getUnit("32dl"), "invalid unit");
    assert.equal(convertHandler.getUnit("113ju"), "invalid unit");
  });

  test("Correct return unit for each valid input unit", function () {
    let inputUnits = [
      "gal",
      "GAL",
      "l",
      "L",
      "mi",
      "MI",
      "km",
      "KM",
      "lbs",
      "LBs",
      "kg",
      "KG",
    ];
    let correctUnits = [
      "L",
      "L",
      "gal",
      "gal",
      "km",
      "km",
      "mi",
      "mi",
      "kg",
      "kg",
      "lbs",
      "lbs",
    ];
    for (let ii = 0; ii < inputUnits.length; ii++)
      assert.equal(
        convertHandler.getReturnUnit(inputUnits[ii]),
        correctUnits[ii]
      );
  });

  test("Validate spelled-out string unit for each valid input unit.", function () {
    let inputUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
    let correctUnits = [
      "gallons",
      "liters",
      "miles",
      "kilometers",
      "pounds",
      "kilograms",
    ];
    for (let ii = 0; ii < inputUnits.length; ii++)
      assert.equal(
        convertHandler.spellOutUnit(inputUnits[ii]),
        correctUnits[ii]
      );
  });
  /*
  test("Validate gal to L", function () {
    assert.equal(convertHandler.convert(3, "gal"), 11.35623);
  });
*/
});
