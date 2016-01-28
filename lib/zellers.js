"use strict";

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
  const d = ((day + (Math.floor(((m + 1) * 26) / 10)) + y + Math.floor(y / 4) + (6 * Math.floor(y / 100)) + (Math.floor(y / 400))) % 7);
  if(d>6) {
    return 0;
  }
  return d-1;
}
