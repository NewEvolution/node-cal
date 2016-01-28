"use strict";

module.exports = {
  center: center,
  parseMonth: parseMonth,
  parseYear: parseYear
};

function center(month, year) {
  const calWidth = 20;
  let header = month;
  if(year) {
    header = header + " " + year;
  }
  const headPadding = Math.floor((calWidth - header.length)/2);
  const fullHeadLength = headPadding + header.length;
  while(header.length < fullHeadLength) {
    header = " " + header;
  }
  return header;
}

function parseMonth(month) {
  if(isNaN(month)) {
    const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    for(let i = 0; i < months.length; ++i) {
      if(month.toLowerCase().indexOf(months[i]) !== -1){
        return i;
      }
    }
  } else if(month > 12) {
  } else {
    return month - 1;
  }
  console.log(`cal: ${month} is neither a month number (1-12) nor name`);
  process.exit(64);
}

function parseYear(year) {
  if(year > 1752 && year < 10000) {
    return year;
  } else {
    console.log(`cal: year ${year} not in range 1753-9999`);
    process.exit(64);
  }
}

