"use strict";

module.exports = {
  center: center,
  parseMonth: parseMonth,
  parseYear: parseYear,
  buildCal: buildCal,
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

function center(calWidth, first, second) {
  let header = first.toString();
  if(second) {
    header += " " + second;
  }
  const headPadding = Math.floor((calWidth - header.length)/2);
  const fullHeadLength = headPadding + header.length;
  while(header.length < fullHeadLength) {
    header = " " + header;
  }
  return header;
}

function parseMonth(month) {
  if(isNaN(month)) {
    for(let i = 0; i < months.length; ++i) {
      if(month.toLowerCase().indexOf(months[i][0]) !== -1){
        return i;
      }
    }
  } else if(month > 12 && month > 0) {
  } else {
    return month - 1;
  }
  throw new RangeError(`cal: ${month} is neither a month number (1-12) nor name`);
}

function parseYear(year) {
  if(year > 1752 && year < 10000) {
    return year;
  } else {
    throw new RangeError(`cal: year ${year} not in range 1753-9999`);
  }
}

function buildCal(month, year) {
  const startDay = zellers.getDay(year, month + 1, 1);
  let header = center(20, months[month][1], year);
  let calendar = [header, "Su Mo Tu We Th Fr Sa"];
  let lastDay;
  if(month === 1) {
    lastDay = leapCheck(year);
  } else {
    lastDay = months[month][2];
  }
  let line = "";
  let day = 1;
  constructor();
  function constructor() {
    for(let i = 0; i < 7; ++i) {
      if(i !== 0) {
        line += " ";
      }
      if(calendar.length === 2 && i < startDay) {
        line += "  ";
      } else {
        if(day < 10) {
          line += " " + day;
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
  if(environment != "darwin") {
    calendar.forEach((item, i) => {
      while(item.length < 22) {
        item += " ";
      }
      calendar[i] = item;
    });
  }
  return calendar;
}

function buildYear() {
  for(let i = 0; i < 12; ++i) {

  }
  return ["", ""];
}

function leapCheck(year) {
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
