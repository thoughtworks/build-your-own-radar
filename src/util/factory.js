const d3 = require('d3');
const _ = {
    map: require('lodash/map'),
    uniqBy: require('lodash/uniqBy'),
    capitalize: require('lodash/capitalize'),
    each: require('lodash/each'),
};

const InputSanitizer = require('./inputSanitizer');
const Radar = require('../models/radar');
const Quadrant = require('../models/quadrant');
const Ring = require('../models/ring');
const Blip = require('../models/blip');
const GraphingRadar = require('../graphing/radar');
const MalformedDataError = require('../exceptions/malformedDataError');
const ContentValidator = require('./contentValidator');
const ExceptionMessages = require('./exceptionMessages');

const plotRadar = function (blips) {
    var rings = _.map(_.uniqBy(blips, 'ring'), 'ring');
    var ringMap = {};
    var maxRings = 4;

    _.each(rings, function (ringName, i) {
        if (i === maxRings) {
            throw new MalformedDataError(ExceptionMessages.TOO_MANY_RINGS);
        }

        ringMap[ringName] = new Ring(ringName, i);
    });

    var quadrants = {};

    _.each(blips, function (blip) {
        if (!quadrants[blip.quadrant]) {
            quadrants[blip.quadrant] = new Quadrant(_.capitalize(blip.quadrant));
        }

        quadrants[blip.quadrant].add(
            new Blip(blip.name, ringMap[blip.ring], blip.isNew.toLowerCase() === 'true', blip.topic, blip.description),
        );
    });

    var radar = new Radar();

    _.each(quadrants, function (quadrant) {
        radar.addQuadrant(quadrant);
    });

    radar.setCurrentSheet('CSV File');

    var size = window.innerHeight - 133 < 620 ? 620 : window.innerHeight - 133;

    new GraphingRadar(size, radar).init().plot();
};

const CSVDocument = function (url) {
    var self = {};

    self.build = function () {
        d3.csv(url).then(createBlips);
    };

    var createBlips = function (data) {
        try {
            var columnNames = data.columns;

            delete data.columns;

            var contentValidator = new ContentValidator(columnNames);

            contentValidator.verifyContent();
            contentValidator.verifyHeaders();

            var blips = _.map(data, new InputSanitizer().sanitize);

            plotRadar(blips);
        } catch (exception) {
            plotErrorMessage(exception);
        }
    };

    return self;
};

const CSVDocumentInput = function () {
    const self = {};
    let sheet;

    self.build = function () {
        sheet = CSVDocument(
            'https://raw.githubusercontent.com/amido/interfaces-and-devices-radar/master/data/Interfaces%20%26%20devices%20-%20Technology%20Radar.csv',
        );
        sheet.build();
    };

    return self;
};

function plotErrorMessage(exception) {
    showErrorMessage(exception);
}

function plotError(exception, container) {
    let message = "Oops! There's been a problem";

    if (exception instanceof MalformedDataError) {
        message = message.concat(exception.message);
    } else {
        console.error(exception);
    }

    container = container.append('div').attr('class', 'error-container');
    const errorContainer = container.append('div').attr('class', 'error-container__message');
    errorContainer.append('div').append('p').html(message);
}

function showErrorMessage(exception) {
    document.getElementById('loadingWrapper').style.display = 'none';

    const container = d3.select('main').append('div').attr('class', 'error-container');
    plotError(exception, container);
}

module.exports = CSVDocumentInput;
