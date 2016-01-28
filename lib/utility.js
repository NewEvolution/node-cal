"use strict";

module.exports = {
  center: center,
  parseMonth: parseMonth,
  parseYear: parseYear,
  buildCal: buildCal
};

const months = [["jan", 31],["feb", 28],["mar", 31],["apr", 30],["may", 31],["jun", 30],["jul", 31],["aug", 31],["sep", 30],["oct", 31],["nov", 30],["dec", 31]];

function center(month, year) {
  const calWidth = 20;
  let header = month;
  if(year) {
    header = header + " " + year;
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
  } else if(month > 12) {
  } else {
    return month - 1;
  }
  console.log(`cal: ${month} is neither a month number (1-12) nor name`);
  process.exit(64);
}

function parseYear(year) {
  if(year > 1752 && year < 10000) {
    return year;
  } else {
    console.log(`cal: year ${year} not in range 1753-9999`);
    process.exit(64);
  }
}

function buildCal(header, startDay, monthNum, year) {
  let calendar = [header, "Su Mo Tu We Th Fr Sa"];
  let lastDay;
  if(monthNum === 1) {
    lastDay = leapCheck(year);
  } else {
    lastDay = months[monthNum][1];
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
  return calendar;
}

function leapCheck(year) {
  if(year % 4 === 0) {
    if(year % 100 === 0) {
      if(year % 400 === 0) {
        return 29;
      } else {
        return 28;
      }
      return 28;
    }
    return 29;
  } else {
    return 28;
  }
}
