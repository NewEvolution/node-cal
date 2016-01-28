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
const monthNum = date.getMonth() + 1;
const year = date.getFullYear();
if(input[0] && !input[1]) {
  header = utility.center(month);
} else {
  header = utility.center(month, year);
}
let calendar = [header];
calendar[calendar.length] = "Su Mo Tu We Th Fr Sa";
const startDay = zellers.getDay(year, monthNum, 1);
let line = "";
let day = 1;
while(day <= 31) {
  for(let i = 0; i < 7; ++i) {
    if(i !== 0 && day <= 31) {
      line += " ";
    }
    if(i < startDay && calendar.length === 2) {
      line += "  ";
    } else {
      if(day < 10) {
        line += " " + day;
      } else if(day <= 31) {
        line += day;
      }
      ++day;
    }
  }
  calendar[calendar.length] = line;
  line = "";
}
console.log(calendar.join("\n"));

