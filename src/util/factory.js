const d3 = require('d3');
const Tabletop = require('tabletop');
const _ = {
  map: require('lodash/map'),
  uniqBy: require('lodash/uniqBy'),
  capitalize: require('lodash/capitalize'),
  each: require('lodash/each')
};

const InputSanitizer = require('./inputSanitizer');
const Radar = require('../models/radar');
const Quadrant = require('../models/quadrant');
const Ring = require('../models/ring');
const Blip = require('../models/blip');
const GraphingRadar = require('../graphing/radar');
const MalformedDataError = require('../exceptions/malformedDataError');

const GoogleSheet = function (sheetId, sheetName) {
  var self = {};

  self.build = function () {
    Tabletop.init({
      key: sheetId,
      callback: createRadar
    });

    function createRadar(sheets, tabletop) {

      try {

        if (!sheetName) {
          sheetName = Object.keys(sheets)[0];
        }
        var columnNames = tabletop.sheets(sheetName).column_names;

        _.each(['name', 'ring', 'quadrant', 'isNew', 'description'], function (field) {

          if (columnNames.indexOf(field) == -1) {
            throw new MalformedDataError('Document is missing one or more required headers or they are misspelled. ' +
              'Check that your document contains headers for "name", "ring", "quadrant", "isNew", "description".');
          }
        });

        var all = tabletop.sheets(sheetName).all();
        var blips = _.map(all, new InputSanitizer().sanitize);

        document.title = tabletop.googleSheetName;
        d3.selectAll(".loading").remove();

        var rings = _.map(_.uniqBy(blips, 'ring'), 'ring');
        var ringMap = {};
        var maxRings = 4;

        _.each(rings, function (ringName, i) {
          if(i == maxRings){
            throw new MalformedDataError('More than 4 rings.')
          }
          ringMap[ringName] = new Ring(ringName, i);
        });

        var quadrants = {};
        _.each(blips, function (blip) {
          if (!quadrants[blip.quadrant]) {
            quadrants[blip.quadrant] = new Quadrant(_.capitalize(blip.quadrant));
          }
          quadrants[blip.quadrant].add(new Blip(blip.name, ringMap[blip.ring], blip.isNew.toLowerCase() === 'true', blip.topic, blip.description))
        });

        var radar = new Radar();
        _.each(quadrants, function (quadrant) {
          radar.addQuadrant(quadrant)
        });

        var size = (window.innerHeight - 133) < 620 ? 620 : window.innerHeight - 133;

        new GraphingRadar(size, radar).init().plot();

      } catch (exception) {

        d3.selectAll(".loading").remove();
        var message = 'Oops! It seems like there are some problems with loading your data. ';

        if (exception instanceof MalformedDataError) {
          message = message.concat(exception.message);
        } else {
          console.error(exception);
        }

        message = message.concat('<br/>', 'Please check <a href="">FAQs</a> for possible solutions.');

        d3.select('body')
          .append('div')
          .attr('class', 'error-container')
          .append('div')
          .attr('class', 'error-container__message')
          .append('p')
          .html(message);
      }
    }
  };

  self.init = function () {
    var content = d3.select('body')
      .append('div')
      .attr('class', 'loading')
      .append('div')
      .attr('class', 'input-sheet');

    set_document_title();

    plotLogo(content);

    var bannerText = '<h1>Building your radar...</h1><p>Your Technology Radar will be available in just a few seconds</p>';
    plotBanner(content, bannerText);
    plotFooter(content);


    return self;
  };

  return self;
};

var QueryParams = function (queryString) {
  var decode = function (s) {
    return decodeURIComponent(s.replace(/\+/g, " "));
  };

  var search = /([^&=]+)=?([^&]*)/g;

  var queryParams = {};
  var match;
  while (match = search.exec(queryString))
    queryParams[decode(match[1])] = decode(match[2]);

  return queryParams
};

const GoogleSheetInput = function () {
  var self = {};

  self.build = function () {
    var queryParams = QueryParams(window.location.search.substring(1));

    if (queryParams.sheetId) {
      return GoogleSheet(queryParams.sheetId, queryParams.sheetName).init().build();
    } else {
      var content = d3.select('body')
        .append('div')
        .attr('class', 'input-sheet');

      set_document_title();

      plotLogo(content);

      var bannerText = '<h1>Build your own radar</h1><p>Once you\'ve <a href ="">created your Radar</a>, you can use this service' +
        ' to generate an <br />interactive version of your Technology Radar. Not sure how? <a href ="">Read this first.</a></p>';

      plotBanner(content, bannerText);

      plotForm(content);

      plotFooter(content);

    }
  };

  return self;
};

function set_document_title() {
  document.title = "Build your own Radar";
}

function plotLogo(content) {
  content.append('div')
    .attr('class', 'input-sheet__logo')
    .html('<a href="https://www.thoughtworks.com"><img src="/images/tw-logo.png" / ></a>');
}

function plotFooter(content) {
  content
    .append('div')
    .attr('id', 'footer')
    .append('p')
    .classed('radar-footer', true)
    .html('Powered by <a href="https://www.thoughtworks.com"> ThoughtWorks</a>. Open source, github link and credit references go here');
}

function plotBanner(content, text) {
  content.append('div')
    .attr('class', 'input-sheet__banner')
    .html(text);

}

function plotForm(content) {
  content.append('div')
    .attr('class', 'input-sheet__form')
    .append('p')
    .html('<strong>Enter the URL of your public google sheet below...</strong>');

  var form = content.select('.input-sheet__form').append('form')
    .attr('method', 'get');

  form.append('input')
    .attr('type', 'text')
    .attr('name', 'sheetId')
    .attr('placeholder', 'e.g. https://docs.google.com/spreadsheets/d/1--_uLSNf/pubhtml');

  form.append('button')
    .attr('type', 'submit')
    .append('a')
    .attr('class', 'button')
    .text('Build my radar');

  form.append('p').html("<a href=''>Need help?</a>");
}


module.exports = GoogleSheetInput;