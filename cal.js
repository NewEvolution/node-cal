#!/usr/bin/env node --harmony_destructuring

"use strict";

const [,,...input] = process.argv;

const zellers = require("./lib/zellers");
const utility = require("./lib/utility");
const locale = "en-us";
let date;
let year;
let header;

function error(code) {
  process.exit(code);
}

function parseYear(year) {
  if(year > 1752 && year < 10000) {
    return year;
  } else {
    console.log(`cal: year ${year} not in range 1753-9999`);
    error(64);
  }
}

function parseMonth(month) {
  console.log("month", month);
  if(isNaN(month)) {
    const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    for(let i = 0; i < months.length; ++i) {
      if(month.toLowerCase().indexOf(months[i]) !== -1){
        return i;
      }
    }
  } else if(month > 12) {
  } else {
    console.log("month2", month);
    return month;
  }
  console.log(`cal: ${month} is neither a month number (1-12) nor name`);
  error(64);
}

switch(input.length) {
  case 0:
    date = new Date();
    break;
  case 1:
    year = parseYear(input[0]);
    break;
  case 2:
    date = new Date(parseYear(input[1]), parseMonth(input[0]));
    break;
  default:
    console.log("usage: cal [[month] year]");
    error(64);
    break;
}

if(date !== undefined) {
  const month = date.toLocaleString(locale, {month: "long"});
  year = date.getFullYear();
  header = utility.center(month, year);
} else {
  //logic for year calendar here
}
let calendar = [header];
calendar[calendar.length] = "Su Mo Tu We Th Fr Sa";
//const startDay = zellers.getDay(year, month, 1);
console.log(calendar.join("\n"));

