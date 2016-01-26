"use strict";

module.exports = {modifiedMonth: modMon, modifiedYear: modYear, getDay: gDay};

function modMon(month) {
  if(month < 3) {
     month += 12;
  }
  return month;
}

function modYear(year, month) {
  if(month < 3) {
    --year;
  }
  return year;
}

function gDay(year, month, day) {
  const y = modYear(year, month);
  const m = modMon(month);
  const d = ((day + (Math.floor(((m + 1) * 26) / 10)) + y + Math.floor(y / 4) + (6 * Math.floor(y / 100)) + (Math.floor(y / 400))) % 7);
  if(d>6) {
    return 0;
  }
  return d-1;
}
