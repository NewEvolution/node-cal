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
    it("Calendar for Aug 2015", () => {
      const expected = execSync("cal 8 2015").toString();
      const actual = execSync("./cal.js 8 2015").toString();
      expect(actual).to.equal(expected);
    });

    it("Calendar for November 2015", () => {
      const expected = execSync("cal 11 2015").toString();
      const actual = execSync("./cal.js 11 2015").toString();
      expect(actual).to.equal(expected);
    });
  });

  describe("Zeller's congruence", () => {
    var zellers = require("../lib/zellers");
    describe(".getDay", () => {
     it("Should return 6 (Saturday) for August 1, 2015", () => {
        expect(zellers.getDay(2015, 8, 1)).to.equal(6);
      });

      it("Should return 0 (Sunday) for November 1, 2015", () => {
        expect(zellers.getDay(2015, 11, 1)).to.equal(0);
      });
    });
  });

  describe("Utility functions", () => {
    var utility = require("../lib/utility");
    describe(".buildCal", () => {
      it("Should return the calendar for August 2015", () => {
        const expected = execSync("cal 8 2015").toString();
        const actual = utility.buildCal(8, 2015).join("\n") + "\n";
        expect(actual).to.equal(expected);
      });

      it("Should return the calendar for November 2015", () => {
        const expected = execSync("cal 11 2015").toString();
        const actual = utility.buildCal(11, 2015).join("\n") + "\n";
        expect(actual).to.equal(expected);
      });
    });
  });
});
