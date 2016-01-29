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

    it("Should handle 6 week months", () => {
      const expected = execSync("cal 8 2015").toString();
      const actual = execSync("./cal.js 8 2015").toString();
      expect(actual).to.equal(expected);
    });

    it("Should handle 5 week months", () => {
      const expected = execSync("cal 10 2015").toString();
      const actual = execSync("./cal.js 10 2015").toString();
      expect(actual).to.equal(expected);
    });

    it("Should handle 4 week months", () => {
      const expected = execSync("cal 2 2015").toString();
      const actual = execSync("./cal.js 2 2015").toString();
      expect(actual).to.equal(expected);
    });

    it("Should handle 30 day months", () => {
      const expected = execSync("cal 11 2015").toString();
      const actual = execSync("./cal.js 11 2015").toString();
      expect(actual).to.equal(expected);
    });

    it("Should handle 31 day months", () => {
      const expected = execSync("cal 12 2015").toString();
      const actual = execSync("./cal.js 12 2015").toString();
      expect(actual).to.equal(expected);
    });

    it("Should handle February leap years", () => {
      const expected = execSync("cal 2 2012").toString();
      const actual = execSync("./cal.js 2 2012").toString();
      expect(actual).to.equal(expected);
    });

    it("Should handle February non-leap years", () => {
      const expected = execSync("cal 2 2014").toString();
      const actual = execSync("./cal.js 2 2014").toString();
      expect(actual).to.equal(expected);
    });
  });

  describe("Zeller's congruence", () => {
    var zellers = require("../lib/zellers");
    describe(".modifiedMonth", () => {
      it("Should return 13 for January", () => {
        const month = zellers.modifiedMonth(1);
        expect(month).to.equal(13);
      });

      it("Should return 14 for February", () => {
        const month = zellers.modifiedMonth(2);
        expect(month).to.equal(14);
      });

      it("Should return the month # for March+", () => {
        const month = zellers.modifiedMonth(3);
        expect(month).to.equal(3);
      });
    });

    describe(".modifiedYear", () => {
      it("Should return prior year for January", () => {
        const year = zellers.modifiedYear(2000, 1);
        expect(year).to.equal(1999);
      });

      it("Should return prior year for February", () => {
        const year = zellers.modifiedYear(2012, 2);
        expect(year).to.equal(2011);
      });

      it("Should return provided year for March+", () => {
        const year = zellers.modifiedYear(2013, 3);
        expect(year).to.equal(2013);
      });
    });

    describe(".getDay", () => {
      it("Should return 2 (Tuesday) for March 1, 2016", () => {
        expect(zellers.getDay(2016, 3, 1)).to.equal(2);
      });

      it("Should return 3 (Wednesday) for March 1, 2000", () => {
        expect(zellers.getDay(2000, 3, 1)).to.equal(3);
      });

      it("Should return 1 (Monday) for March 1, 2100", () => {
        expect(zellers.getDay(2100, 3, 1)).to.equal(1);
      });

      it("Should return 0 (Sunday) for March 2, 2200", () => {
        expect(zellers.getDay(2200, 3, 2)).to.equal(0);
      });

      it("Should return 4 (Thursday) for March 1, 2300", () => {
        expect(zellers.getDay(2300, 3, 1)).to.equal(4);
      });
    });
  });

  describe("Utility functions", () => {
    var utility = require("../lib/utility");
    describe(".center", () => {
      it("Should center January 2016", () => {
        expect(utility.center("January", "2016")).to.equal("    January 2016");
      });

      it("Should center February 2016", () => {
        expect(utility.center("February", "2016")).to.equal("   February 2016");
      });

      it("Should center May 120", () => {
        expect(utility.center("May", "120")).to.equal("      May 120");
      });
    });

    describe(".parseMonth", () => {
      it("Should return 1 for FEB", () => {
        expect(utility.parseMonth("FEB")).to.equal(1);
      });

      it("Should return 1 for february", () => {
        expect(utility.parseMonth("february")).to.equal(1);
      });

      it("Should return 1 for 2", () => {
        expect(utility.parseMonth(2)).to.equal(1);
      });
    });
  });
});
