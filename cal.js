#!/usr/bin/env node --harmony_destructuring

"use strict";

const [,,...input] = process.argv;

const utility = require("./lib/utility");
const locale = "en-us";
let calendar = [];
let month;
let year;

switch(input.length) {
  case 0:
    const date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    break;
  case 1:
    try {
      year = utility.parseYear(input[0]);
    } catch(e) {
      console.log(e);
      process.exit(64);
    }
    break;
  case 2:
    try {
      month = utility.parseMonth(input[0]);
      year = utility.parseYear(input[1]);
    } catch(e) {
      console.log(e);
      process.exit(64);
    }
    break;
  default:
    console.log("usage: cal [[month] year]");
    process.exit(64);
    break;
}

if(input[0] && !input[1]) {
  calendar = utility.buildYear(year);
} else {
  calendar = utility.buildCal(month, year);
}
console.log(calendar.join("\n"));

