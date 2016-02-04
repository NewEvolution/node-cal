"use strict";

const expect = require("chai").expect;
const execSync = require("child_process").execSync;

describe("Full test", () => {
  describe("Test suite", () => {
    it("True should be true", () => {
      expect(true).to.be.true;
    });
  });

  describe("Calendar", () => {
    describe("CLI", () => {
      describe("Month output", () => {
        it("Should return the current month", () => {
          const expected = execSync("cal").toString();
          const actual = execSync("./cal.js").toString();
          expect(actual).to.equal(expected);
        });

        it("Should return 6 week months", () => {
          const expected = execSync("cal 8 2015").toString();
          const actual = execSync("./cal.js 8 2015").toString();
          expect(actual).to.equal(expected);
        });

        it("Should return 5 week months", () => {
          const expected = execSync("cal 10 2015").toString();
          const actual = execSync("./cal.js 10 2015").toString();
          expect(actual).to.equal(expected);
        });

        it("Should return 4 week months", () => {
          const expected = execSync("cal 2 2015").toString();
          const actual = execSync("./cal.js 2 2015").toString();
          expect(actual).to.equal(expected);
        });

        it("Should return 30 day months", () => {
          const expected = execSync("cal 11 2015").toString();
          const actual = execSync("./cal.js 11 2015").toString();
          expect(actual).to.equal(expected);
        });

        it("Should return 31 day months", () => {
          const expected = execSync("cal 12 2015").toString();
          const actual = execSync("./cal.js 12 2015").toString();
          expect(actual).to.equal(expected);
        });

        it("Should return February leap years", () => {
          const expected = execSync("cal 2 2012").toString();
          const actual = execSync("./cal.js 2 2012").toString();
          expect(actual).to.equal(expected);
        });

        it("Should return February non-leap years", () => {
          const expected = execSync("cal 2 2014").toString();
          const actual = execSync("./cal.js 2 2014").toString();
          expect(actual).to.equal(expected);
        });
      });;

      describe("Year output", () => {
        it("Should return the current year", () => {
          const date = new Date();
          const year = date.getFullYear();
          const expected = execSync(`cal ${year}`).toString();
          const actual = execSync(`./cal.js ${year}`).toString();
          expect(actual).to.equal(expected);
        });

        it("Should return the year for 2016", () => {
          const expected = execSync("cal 2016").toString();
          const actual = execSync("./cal.js 2016").toString();
          expect(actual).to.equal(expected);
        });

        it("Should return the year for 2000", () => {
          const expected = execSync("cal 2000").toString();
          const actual = execSync("./cal.js 2000").toString();
          expect(actual).to.equal(expected);
        });

        it("Should return the year for 2100", () => {
          const expected = execSync("cal 2100").toString();
          const actual = execSync("./cal.js 2100").toString();
          expect(actual).to.equal(expected);
        });

        it("Should return the year for 2200", () => {
          const expected = execSync("cal 2200").toString();
          const actual = execSync("./cal.js 2200").toString();
          expect(actual).to.equal(expected);
        });

        it("Should return the year for 2300", () => {
          const expected = execSync("cal 2300").toString();
          const actual = execSync("./cal.js 2300").toString();
          expect(actual).to.equal(expected);
        });
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

        it("Should return 0 (Sunday) for November 1, 2015", () => {
          expect(zellers.getDay(2015, 11, 1)).to.equal(0);
        });

        it("Should return 6 (Saturday) for August 1, 2015", () => {
          expect(zellers.getDay(2015, 8, 1)).to.equal(6);
        });
      });
    });

    describe("Utility functions", () => {
      var utility = require("../lib/utility");
      describe(".center", () => {
        it("Should center January 2016", () => {
          expect(utility.center(20, "January", "2016")).to.equal("    January 2016");
        });

        it("Should center February 2016", () => {
          expect(utility.center(20, "February", "2016")).to.equal("   February 2016");
        });

        it("Should center May 120", () => {
          expect(utility.center(20, "May", "120")).to.equal("      May 120");
        });

        it("Should center October in month width for year view", () => {
          expect(utility.center(20, "October")).to.equal("      October");
        });

        it("Should center 2016 in year width for year view", () => {
          expect(utility.center(62, 2016)).to.equal("                             2016");
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

        it("Should return an error for giberish", () => {
          expect(utility.parseMonth.bind(utility.parseMoth, "giberish")).to.throw(RangeError);
        });

        it("Should return an error for months > 12", () => {
          expect(utility.parseMonth.bind(utility.parseMoth, 15)).to.throw(RangeError);
        });
      });

      describe(".parseYear", () => {
        it("Should return 2015 for 2015", () => {
          expect(utility.parseYear(2015)).to.equal(2015);
        });

        it("Should return 9999 for 9999", () => {
          expect(utility.parseYear(9999)).to.equal(9999);
        });

        it("Should return 2015 for 2015", () => {
          expect(utility.parseYear(2015)).to.equal(2015);
        });

        it("Should return 2015 for 2015", () => {
          expect(utility.parseYear(2015)).to.equal(2015);
        });

        it("Should return an error for giberish", () => {
          expect(utility.parseYear.bind(utility.parseYear, "giberish")).to.throw(RangeError);
        });

        it("Should return an error for years before 1753", () => {
          expect(utility.parseYear.bind(utility.parseYear, 1752)).to.throw(RangeError);
        });

        it("Should return an error for years after 9999", () => {
          expect(utility.parseYear.bind(utility.parseYear, 10000)).to.throw(RangeError);
        });
      });

      describe(".buildMonth", () => {
        it("Should return the calendar for January 2015", () => {
          const expected = execSync("cal 1 2015").toString();
          const actual = utility.buildMonth(0, 2015).join("\n") + "\n";
          expect(actual).to.equal(expected);
        });

        it("Should return the calendar for February 2012", () => {
          const expected = execSync("cal 2 2012").toString();
          const actual = utility.buildMonth(1, 2012).join("\n") + "\n";
          expect(actual).to.equal(expected);
        });

        it("Should return the calendar for November 7685", () => {
          const expected = execSync("cal 11 7685").toString();
          const actual = utility.buildMonth(10, 7685).join("\n") + "\n";
          expect(actual).to.equal(expected);
        });

        it("Should return the calendar for August 2215", () => {
          const expected = execSync("cal 8 2215").toString();
          const actual = utility.buildMonth(7, 2215).join("\n") + "\n";
          expect(actual).to.equal(expected);
        });

        it("Should return the calendar for February 2022", () => {
          const expected = execSync("cal 2 2022").toString();
          const actual = utility.buildMonth(1, 2022).join("\n") + "\n";
          expect(actual).to.equal(expected);
        });

        it("Should return an OS X formatted calendar", () => {
          const expected = [
            "      May 2012",
            "Su Mo Tu We Th Fr Sa",
            "       1  2  3  4  5",
            " 6  7  8  9 10 11 12",
            "13 14 15 16 17 18 19",
            "20 21 22 23 24 25 26",
            "27 28 29 30 31",
            ""
          ];
          const actual = utility.buildMonth(4, 2012, false, true);
          expect(actual).to.eql(expected);
        });

        it("Should center the month name for year view and add padding for year view & Linux", () => {
          const expected = ["        May           ",
            "Su Mo Tu We Th Fr Sa  ",
            "                1  2  ",
            " 3  4  5  6  7  8  9  ",
            "10 11 12 13 14 15 16  ",
            "17 18 19 20 21 22 23  ",
            "24 25 26 27 28 29 30  ",
            "31                    "
          ];
          const actual = utility.buildMonth(4, 2015, true);
          expect(actual).to.eql(expected);
        });
      });

      describe(".buildYear", () => {
        it("Should return the current year", () => {
          const date = new Date();
          const year = date.getFullYear();
          const expected = execSync(`cal ${year}`).toString();
          const actual = utility.buildYear(year).join("\n") + "\n";
          expect(actual).to.equal(expected);
        });

        it("Should return the year for 2016", () => {
          const expected = execSync("cal 2016").toString();
          const actual = utility.buildYear(2016).join("\n") + "\n";
          expect(actual).to.equal(expected);
        });

        it("Should return the year for 2000", () => {
          const expected = execSync("cal 2000").toString();
          const actual = utility.buildYear(2000).join("\n") + "\n";
          expect(actual).to.equal(expected);
        });

        it("Should return the year for 2100", () => {
          const expected = execSync("cal 2100").toString();
          const actual = utility.buildYear(2100).join("\n") + "\n";
          expect(actual).to.equal(expected);
        });

        it("Should return the year for 2200", () => {
          const expected = execSync("cal 2200").toString();
          const actual = utility.buildYear(2200).join("\n") + "\n";
          expect(actual).to.equal(expected);
        });

        it("Should return the year for 2300", () => {
          const expected = execSync("cal 2300").toString();
          const actual = utility.buildYear(2300).join("\n") + "\n";
          expect(actual).to.equal(expected);
        });

        it("Should return Linux formatted year view", () => {
          const expected = [
            "                            2000",
            "      January               February               March          ",
            "Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  ",
            "                   1         1  2  3  4  5            1  2  3  4  ",
            " 2  3  4  5  6  7  8   6  7  8  9 10 11 12   5  6  7  8  9 10 11  ",
            " 9 10 11 12 13 14 15  13 14 15 16 17 18 19  12 13 14 15 16 17 18  ",
            "16 17 18 19 20 21 22  20 21 22 23 24 25 26  19 20 21 22 23 24 25  ",
            "23 24 25 26 27 28 29  27 28 29              26 27 28 29 30 31     ",
            "30 31                                                             ",
            "",
            "       April                  May                   June          ",
            "Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  ",
            "                   1      1  2  3  4  5  6               1  2  3  ",
            " 2  3  4  5  6  7  8   7  8  9 10 11 12 13   4  5  6  7  8  9 10  ",
            " 9 10 11 12 13 14 15  14 15 16 17 18 19 20  11 12 13 14 15 16 17  ",
            "16 17 18 19 20 21 22  21 22 23 24 25 26 27  18 19 20 21 22 23 24  ",
            "23 24 25 26 27 28 29  28 29 30 31           25 26 27 28 29 30     ",
            "30                                                                ",
            "",
            "        July                 August              September        ",
            "Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  ",
            "                   1         1  2  3  4  5                  1  2  ",
            " 2  3  4  5  6  7  8   6  7  8  9 10 11 12   3  4  5  6  7  8  9  ",
            " 9 10 11 12 13 14 15  13 14 15 16 17 18 19  10 11 12 13 14 15 16  ",
            "16 17 18 19 20 21 22  20 21 22 23 24 25 26  17 18 19 20 21 22 23  ",
            "23 24 25 26 27 28 29  27 28 29 30 31        24 25 26 27 28 29 30  ",
            "30 31                                                             ",
            "",
            "      October               November              December        ",
            "Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  ",
            " 1  2  3  4  5  6  7            1  2  3  4                  1  2  ",
            " 8  9 10 11 12 13 14   5  6  7  8  9 10 11   3  4  5  6  7  8  9  ",
            "15 16 17 18 19 20 21  12 13 14 15 16 17 18  10 11 12 13 14 15 16  ",
            "22 23 24 25 26 27 28  19 20 21 22 23 24 25  17 18 19 20 21 22 23  ",
            "29 30 31              26 27 28 29 30        24 25 26 27 28 29 30  ",
            "                                            31                    "
          ];
          const actual = utility.buildYear(2000, true);
          expect(actual).to.eql(expected);
        });;

        it("Should return OS X formatted year view", () => {
          const expected = [
            "                             2000",
            "",
            "      January               February               March",
            "Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa",
            "                   1         1  2  3  4  5            1  2  3  4",
            " 2  3  4  5  6  7  8   6  7  8  9 10 11 12   5  6  7  8  9 10 11",
            " 9 10 11 12 13 14 15  13 14 15 16 17 18 19  12 13 14 15 16 17 18",
            "16 17 18 19 20 21 22  20 21 22 23 24 25 26  19 20 21 22 23 24 25",
            "23 24 25 26 27 28 29  27 28 29              26 27 28 29 30 31",
            "30 31                                       ",
            "       April                  May                   June",
            "Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa",
            "                   1      1  2  3  4  5  6               1  2  3",
            " 2  3  4  5  6  7  8   7  8  9 10 11 12 13   4  5  6  7  8  9 10",
            " 9 10 11 12 13 14 15  14 15 16 17 18 19 20  11 12 13 14 15 16 17",
            "16 17 18 19 20 21 22  21 22 23 24 25 26 27  18 19 20 21 22 23 24",
            "23 24 25 26 27 28 29  28 29 30 31           25 26 27 28 29 30",
            "30                                          ",
            "        July                 August              September",
            "Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa",
            "                   1         1  2  3  4  5                  1  2",
            " 2  3  4  5  6  7  8   6  7  8  9 10 11 12   3  4  5  6  7  8  9",
            " 9 10 11 12 13 14 15  13 14 15 16 17 18 19  10 11 12 13 14 15 16",
            "16 17 18 19 20 21 22  20 21 22 23 24 25 26  17 18 19 20 21 22 23",
            "23 24 25 26 27 28 29  27 28 29 30 31        24 25 26 27 28 29 30",
            "30 31                                       ",
            "      October               November              December",
            "Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa",
            " 1  2  3  4  5  6  7            1  2  3  4                  1  2",
            " 8  9 10 11 12 13 14   5  6  7  8  9 10 11   3  4  5  6  7  8  9",
            "15 16 17 18 19 20 21  12 13 14 15 16 17 18  10 11 12 13 14 15 16",
            "22 23 24 25 26 27 28  19 20 21 22 23 24 25  17 18 19 20 21 22 23",
            "29 30 31              26 27 28 29 30        24 25 26 27 28 29 30",
            "                                            31"
          ];
          const actual = utility.buildYear(2000);
          expect(actual).to.eql(expected);
        });
      });

      describe(".leapCheck", () => {
        it("Should return 28 days for Feb 2015", () => {
          expect(utility.leapCheck(2015)).to.equal(28);
        });

        it("Should return 29 days for Feb 2016", () => {
          expect(utility.leapCheck(2016)).to.equal(29);
        });

        it("Should return 28 days for Feb 2700", () => {
          expect(utility.leapCheck(2700)).to.equal(28);
        });

        it("Should return 29 days for Feb 2400", () => {
          expect(utility.leapCheck(2400)).to.equal(29);
        });
      });
    });
  });
});
