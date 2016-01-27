#!/usr/bin/env node

var cal = function() {
  "use strict";
  const zellers = require("./lib/zellers");
  const utility = require("./lib/utility");
  const today = new Date();
  const locale = "en-us";
  const month = today.toLocaleString(locale, {month: "long"});
  const year = today.getFullYear();
  const header = utility.center(month, year);
  let calendar = [header];
  calendar[calendar.length] = "Su Mo Tu We Th Fr Sa";
  const startDay = zellers.getDay(year, month, 1);
  console.log(calendar.join("\n"));
}();

