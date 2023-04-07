const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  test("Test GET /api/convert for valid input", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.returnUnit, "gal");
        assert.equal(res.body.string, "10 liters converts to 2.64172 gallons");
        done();
      });
  });
  test("Test GET /api/convert for invalid input", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });
  test("Test GET /api/convert for invalid number", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      });
  });
  test("Test GET /api/convert for invalid number and unit", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });
  test("Test GET /api/convert for valid input with no number", function (done) {
    chai
      .request(server)
      .keepOpen()
      .get("/api/convert?input=mi")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "mi");
        assert.equal(res.body.returnNum, 1.60934);
        assert.equal(res.body.returnUnit, "km");
        assert.equal(res.body.string, "1 miles converts to 1.60934 kilometers");
        done();
      });
  });
});
