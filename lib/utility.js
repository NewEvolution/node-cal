"use strict";

module.exports = {center: center};

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
