const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Testing convertHandler.getNum", function () {
    assert.equal(
      convertHandler.getNum("3gal"),
      3,
      "correctly read a whole number input"
    );
    assert.equal(
      convertHandler.getNum("3.1gal"),
      3.1,
      "correctly read a decimal number input"
    );
    assert.equal(
      convertHandler.getNum("4/2gal"),
      2,
      "correctly read a fractional input"
    );
    assert.equal(
      convertHandler.getNum("2.5/2gal"),
      1.25,
      "correctly read a fractional input with a decimal"
    );
    assert.equal(
      convertHandler.getNum("2.5/2/2gal"),
      "invalid number",
      "correctly return an error on a double-fraction (i.e. 3/2/3)"
    );
    assert.equal(
      convertHandler.getNum("gal"),
      1,
      "correctly default to a numerical input of 1 when no numerical input is provided"
    );
  });
});
