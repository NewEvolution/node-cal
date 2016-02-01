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
  console.log("Zeller's year:", year);
  console.log("Zeller's month:", month);
  console.log("Zeller's day:", day);
  const y = modifiedYear(year, month);
  const m = modifiedMonth(month);
  console.log("Zeller's modifiedYear:", y);
  console.log("Zeller's modifiedMonth:", m);
  const d = (((day + (Math.floor(((m + 1) * 26) / 10)) + y + Math.floor(y / 4) + (6 * Math.floor(y / 100)) + (Math.floor(y / 400))) % 7) - 1);
  console.log("Zeller's Unmodified Offset:", d);
  if(d < 0) {
    console.log("Zeller's offset:", 6);
    return 6;
  }
  console.log("Zeller's offset:", d);
  return d;
}
