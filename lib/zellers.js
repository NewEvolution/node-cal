"use strict";
/* eslint no-magic-numbers: 0 */

module.exports = {
  modifiedMonth: modifiedMonth,
  modifiedYear: modifiedYear,
  getDay: getDay
};

function modifiedMonth(month) {
  if(month < 3) {
    month += 12;
  }
  return month;
}

function modifiedYear(year, month) {
  if(month < 3) {
    --year;
  }
  return year;
}

function getDay(year, month, day) {
  const y = modifiedYear(year, month);
  const m = modifiedMonth(month);
  const d = (((day + (Math.floor(((m + 1) * 26) / 10)) + y + Math.floor(y / 4) + (6 * Math.floor(y / 100)) + (Math.floor(y / 400))) % 7) - 1);
  if(d < 0) {
    return 6;
  }
  return d;
}
