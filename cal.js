#!/usr/bin/env node --harmony_destructuring

"use strict";

const [,,...input] = process.argv;

const zellers = require("./lib/zellers");
const utility = require("./lib/utility");
const locale = "en-us";
let date;
let header;

switch(input.length) {
  case 0:
    date = new Date();
    break;
  case 1:
    date = new Date(utility.parseYear(input[0]), 0);
    break;
  case 2:
    date = new Date(utility.parseYear(input[1]), utility.parseMonth(input[0]));
    break;
  default:
    console.log("usage: cal [[month] year]");
    process.exit(64);
    break;
}

const month = date.toLocaleString(locale, {month: "long"});
const monthNum = date.getMonth();
const year = date.getFullYear();
if(input[0] && !input[1]) {
  header = utility.center(month);
} else {
  header = utility.center(month, year);
}
const startDay = zellers.getDay(year, monthNum + 1, 1);
const calendar = utility.buildCal(header, startDay, monthNum, year);
console.log(calendar.join("\n"));

