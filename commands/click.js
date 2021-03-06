'use strict';
var seleniumWebTestDriver = require('../src/selenium-web-test-driver');
const RE_STR  = '["]?([^\"]+)["]?'; // e.g. foo.bar, "foo.bar", or "foo bar"

/**
 * e.g. click
 */
module.exports = {
  name: 'click',
  help: 'click',
  regExp: new RegExp(`^click$`),
  func:
    /** must return a Promise, so that it can be chained with next command*/
    function(selector) {
      if (seleniumWebTestDriver.lastFoundElement) {
        let lastFoundElement = seleniumWebTestDriver.lastFoundElement;
        return lastFoundElement.click();
      } else {
        throw "There is no element to click";
      }
   }
};
