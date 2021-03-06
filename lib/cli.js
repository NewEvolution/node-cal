"use strict";

const [, , ...input] = process.argv;

const utility = require("./utility");
const CLIusageError = 64;
const date = new Date();
let calendar = [];
let month;
let year;

switch (input.length) {
  case 0:
    month = date.getMonth();
    year = date.getFullYear();
    break;
  case 1:
    try {
      year = utility.parseYear(input[0]);
    } catch (e) {
      console.log(e);
      process.exit(CLIusageError);
    }
    break;
  case 2:
    try {
      month = utility.parseMonth(input[0]);
      year = utility.parseYear(input[1]);
    } catch (e) {
      console.log(e);
      process.exit(CLIusageError);
    }
    break;
  default:
    console.log("usage: cal [[month] year]");
    process.exit(CLIusageError);
    break;
}

if (input[0] && !input[1]) {
  calendar = utility.buildYear(+year);
} else {
  calendar = utility.buildMonth(+month, +year);
}
console.log(calendar.join("\n"));
