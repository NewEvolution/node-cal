[![Build Status](https://travis-ci.org/NewEvolution/node-cal.svg?branch=master)](https://travis-ci.org/NewEvolution/node-cal) [![Coverage Status](https://coveralls.io/repos/github/NewEvolution/node-cal/badge.svg?branch=master)](https://coveralls.io/github/NewEvolution/node-cal?branch=master)
#node-cal

Replication of the command line app 'cal' written as a Node.js module.

Built using TDD with [Mocha](http://mochajs.org/) and [Chai](http://chaijs.com/) with [Travis CI](https://travis-ci.org/) for
distributed testing & [Coveralls](https://coveralls.io/) for test coverage.

###Usage
- Post clone, run _npm install_ in the main directory
- Calling _./cal.js_ with no arguments returns the current month's
  calendar
- _./cal.js <year>_ with a 4 digit year will return the year calendar
  for that year
- _./cal.js <month> <year>_ with month name, abbreviation or number and
  a 4 digit year will return that month's calendar.
