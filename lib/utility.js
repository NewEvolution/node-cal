"use strict";
/* eslint no-magic-numbers: 0 */

module.exports = {
  center: center,
  parseMonth: parseMonth,
  parseYear: parseYear,
  buildMonth: buildMonth,
  buildYear: buildYear,
  leapCheck: leapCheck
};

const environment = process.platform;
const zellers = require("./zellers");
const months = [
  ["jan", "January", 31],
  ["feb", "February"],
  ["mar", "March", 31],
  ["apr", "April", 30],
  ["may", "May", 31],
  ["jun", "June", 30],
  ["jul", "July", 31],
  ["aug", "August", 31],
  ["sep", "September", 30],
  ["oct", "October", 31],
  ["nov", "November", 30],
  ["dec", "December", 31]
];

function center (calWidth, first, second) {
  let header = first.toString();
  if(second) {
    header += " " + second;
  }
  const headPadding = Math.floor((calWidth - header.length) / 2);
  const fullHeadLength = headPadding + header.length;
  while(header.length < fullHeadLength) {
    header = " " + header;
  }
  return header;
}

function parseMonth (month) {
  if(isNaN(month)) {
    for(let i = 0; i < months.length; ++i) {
      if(month.toLowerCase().indexOf(months[i][0]) !== -1) {
        return i;
      }
    }
  } else if(month > 0 && month <= 12) {
    return month - 1;
  }
  throw new RangeError(`cal: ${month} is neither a month number (1-12) nor name`);
}

function parseYear (year) {
  if(year > 1752 && year < 10000) {
    return year;
  } else {
    throw new RangeError(`cal: year ${year} not in range 1753-9999`);
  }
}

function buildMonth (month, year, isYear, testEnv) {
  let highlight = false;
  let date;
  let today;
  let thisMonth;
  let thisYear;
  if(environment !== "darwin" || testEnv) {
    date = new Date();
    today = date.getDate();
    thisMonth = date.getMonth();
    thisYear = date.getFullYear();
    if(month === thisMonth && year === thisYear) {
      highlight = true;
    }
  }
  const startDay = zellers.getDay(year, month + 1, 1);
  let header;
  if(isYear) {
    header = center(20, months[month][1]);
  } else {
    header = center(20, months[month][1], year);
  }
  const calendar = [header, "Su Mo Tu We Th Fr Sa"];
  let lastDay;
  if(month === 1) {
    lastDay = leapCheck(year);
  } else {
    lastDay = months[month][2];
  }
  let line = "";
  let day = 1;
  constructor();
  function constructor () {
    for(let i = 0; i < 7; ++i) {
      if(i !== 0) {
        line += " ";
      }
      if(calendar.length === 2 && i < startDay) {
        line += "  ";
      } else {
        if(day < 10) {
          if(highlight && today === day) {
            line += "_\b " + "_\b" + day;
          } else {
            line += " " + day;
          }
        } else if(highlight && today === day) {
          day = day.toString();
          line += "_\b" + day[0] + "_\b" + day[1];
        } else {
          line += day;
        }
        ++day;
        if(day > lastDay) {
          return;
        }
      }
    }
    calendar[calendar.length] = line;
    line = "";
    constructor();
  }
  calendar[calendar.length] = line;
  while(calendar.length < 8) {
    calendar[calendar.length] = "";
  }
  if((environment !== "darwin" && !testEnv) || isYear) {
    calendar.forEach((item, i) => {
      if(item.indexOf("_\b") !== -1) {
        item += "  ";
      }
      while(item.length < 22) {
        item += " ";
      }
      calendar[i] = item;
    });
  }
  return calendar;
}

function buildYear (year, testEnv) {
  const calendar = [];
  const monthsArr = [];
  for(let i = 0; i < 12; ++i) {
    monthsArr[monthsArr.length] = buildMonth(i, year, true);
  }
  let rowOffset = 0;
  for(let monthOffset = 0; monthOffset < 12; monthOffset += 3, rowOffset += 8) {
    for(let calRow = 0; calRow < 8; ++calRow) {
      for(let monthCal = 0; monthCal < 3; ++monthCal) {
        const rowIndex = calRow + rowOffset;
        const monthIndex = monthCal + monthOffset;
        if(!calendar[rowIndex]) {
          calendar[rowIndex] = "";
        }
        if(((environment === "darwin" && !testEnv) || (environment !== "darwin" && testEnv)) && monthCal === 2) {
          monthsArr[monthIndex][calRow] = monthsArr[monthIndex][calRow].trimRight();
        }
        calendar[rowIndex] += monthsArr[monthIndex][calRow];
      }
    }
  }
  if((environment === "darwin" && !testEnv) || (environment !== "darwin" && testEnv)) {
    calendar.unshift("");
    calendar.unshift(center(62, year));
  } else {
    for(let i = 24; i > 0; i -= 8) {
      calendar.splice(i, 0, "");
    }
    calendar.unshift(center(61, year));
  }
  return calendar;
}

function leapCheck (year) {
  if(year % 4 === 0) {
    if(year % 100 === 0) {
      if(year % 400 === 0) {
        return 29;
      }
      return 28;
    }
    return 29;
  } else {
    return 28;
  }
}
