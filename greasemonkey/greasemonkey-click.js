// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://localhost:8080/?sheetId=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F1yYXaC-IFuHHllkGY0ZWOHwx49Im0unfpWjDWUWeuFds%2Fedit%23gid%3D0
// @grant        none
// ==/UserScript==

var intervalId;
var count = 1;

(f = function() {

  // Quadrant selection every 30 seconds
  setTimeout(function() {
    clearInterval(intervalId);
    intervalId = null;
    f();
  }, 5000);

  if(count > 4) {
    $('.home-link').click();
    count = 0;
    return;
  }

  count=count+1;

  let index = Math.round((Math.random() * 3));
  $('.button')[index].click();

  let order = 'first';
  if (index === 0) {
    order = 'first';
  }
  if (index === 1) {
    order = 'second';
  }
  if (index === 2) {
    order = 'third';
  }
  if (index === 3) {
    order = 'fourth';
  }

  let classname = '.quadrant-table.' + order;

  var length = $(classname).find('.blip-list-item').length - 1;
  $(classname).find('.blip-list-item')[0].click();

  // Blip Item selection every 10 seconds
  intervalId = setInterval(function () {
    let ind = Math.floor(Math.random() * length);
    $(classname).find('.blip-list-item')[ind].click();
  }, 1000)
}) ();

setTimeout(function() {

}, 30000);
