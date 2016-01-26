"use strict";

const {expect} = require("chai");
const {execSync} = require("child_process");

describe("Test suite", () => {
  it("True should be true", () => {
    expect(true).to.be.true;
  });
});

describe("Calendar", () => {
  describe("CLI", () => {
    it("Should handle the current month", () => {
      const expected = execSync("cal").toString();
      const actual = execSync("./cal.js").toString();
      expect(actual).to.equal(expected);
    });
  });

  describe("Zellar's congruence", () => {
    describe(".modified_month", () => {
      it("Should return 13 for January", () => {
        const month = zellars.modified_month(2012, 1);
        expect(month).to.equal(13);
      });

      it("Should return 14 for February", () => {
        const month = zellars.modified_month(2012, 2);
        expect(month).to.equal(14);
      });

      it("Should return 3 for March", () => {
        const month = zellars.modified_month(2012, 3);
        expect(month).to.equal(3);
      });
    });

    describe(".modified_year", () => {
      it("Should return prior year for January", () => {
        const year = zellars.modified_year(2000, 1);
        expect(year).to.equal(1999);
      });

      it("Should return prior year for February", () => {
        const year = zellars.modified_year(2012, 2);
        expect(year).to.equal(2011);
      });

      it("Should return current year for March", () => {
        const year = zellars.modified_year(2013, 3);
        expect(year).to.equal(2013);
      });
    });

    describe(".calculate", () => {
      it("Should return prior year for January", () => {
      });
      it("Should return prior year for February", () => {
      });
      it("Should return current year for March", () => {
      });
    });
  });
});
