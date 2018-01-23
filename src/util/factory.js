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
const SheetNotFoundError = require('../exceptions/sheetNotFoundError');
const UnauthorizedError = require('../exceptions/unauthorizedError');
const ContentValidator = require('./contentValidator');
const Sheet = require('./sheet');
const ExceptionMessages = require('./exceptionMessages');
const GoogleAuth = require('./googleAuth');
const LoginForm = require('./loginForm');
const ProfileMenu = require('./profileMenu');

const USE_AUTHENTICATION = process.env.USE_AUTHENTICATION;

const plotRadar = function (title, blips) {
    document.title = title;
    d3.selectAll(".loading").remove();

    var rings = _.map(_.uniqBy(blips, 'ring'), 'ring');
    var ringMap = {};
    var maxRings = 4;

    _.each(rings, function (ringName, i) {
        if (i == maxRings) {
            throw new MalformedDataError(ExceptionMessages.TOO_MANY_RINGS);
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
}

const GoogleSheet = function (sheetReference, sheetName) {
    var self = {};

    self.build = function () {
        var sheet = new Sheet(sheetReference);
        sheet.getSheet().then(function (sheetResponse) {
            const sheetName = sheetResponse.result.sheets[0].properties.title;
            sheet.getData(sheetName + '!A1:E')
                .then(function (response) {
                    response.result.values.forEach(function (value) {
                        var contentValidator = new ContentValidator(response.result.values[0]);
                        contentValidator.verifyContent();
                        contentValidator.verifyHeaders();
                    });

                    const all = response.result.values;
                    all.shift();
                    var blips = _.map(all, new InputSanitizer().sanitize);
                    plotRadar(sheetName, blips);
                });
        }, function (error) {
            if (error.status === 403) {
                plotErrorMessage(new UnauthorizedError(ExceptionMessages.UNAUTHORIZED));
            } else if (error.status === 404) {
                plotErrorMessage(new SheetNotFoundError(ExceptionMessages.SHEET_NOT_FOUND));
            }
        });

        function createBlips(__, tabletop) {

            try {

                if (!sheetName) {
                    sheetName = tabletop.foundSheetNames[0];
                }
                var columnNames = tabletop.sheets(sheetName).columnNames;

                var contentValidator = new ContentValidator(columnNames);
                contentValidator.verifyContent();
                contentValidator.verifyHeaders();

                var all = tabletop.sheets(sheetName).all();
                var blips = _.map(all.shift(), new InputSanitizer().sanitize);
                plotRadar(tabletop.googleSheetName, blips);
            } catch (exception) {
                plotErrorMessage(exception);
            }
        }
    };

    self.init = function () {
        plotLoading();
        return self;
    };

    return self;
};

const CSVDocument = function (url) {
    var self = {};

    self.build = function () {
        d3.csv(url, createBlips);
    }

    var createBlips = function (data) {
        try {
            var columnNames = data['columns'];
            delete data['columns'];
            var contentValidator = new ContentValidator(columnNames);
            contentValidator.verifyContent();
            contentValidator.verifyHeaders();
            var blips = _.map(data, new InputSanitizer().sanitize);
            plotRadar(FileName(url), blips);
        } catch (exception) {
            plotErrorMessage(exception);
        }
    }

    self.init = function () {
        plotLoading();
        return self;
    };

    return self;
};

const QueryParams = function (queryString) {
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

const DomainName = function (url) {
    var search = /.+:\/\/([^\/]+)/;
    var match = search.exec(decodeURIComponent(url.replace(/\+/g, " ")));
    return match == null ? null : match[1];
}


const FileName = function (url) {
    var search = /([^\/]+)$/;
    var match = search.exec(decodeURIComponent(url.replace(/\+/g, " ")));
    if (match != null) {
        var str = match[1];
        return str;
    }
    return url;
}


const GoogleSheetInput = function () {
    var self = {};
    self.cleanUpRender = function () {
        d3.select('.input-sheet').remove();
    }

    self.render = function () {
        var domainName = DomainName(window.location.search.substring(1));
        var queryParams = QueryParams(window.location.search.substring(1));

        self.cleanUpRender();
        if (self.isLoggedIn && domainName && queryParams.sheetId.endsWith('csv')) {
            var sheet = CSVDocument(queryParams.sheetId);
            sheet.init().build();
        }
        else if (self.isLoggedIn && domainName && domainName.endsWith('google.com') && queryParams.sheetId) {
            var sheet = GoogleSheet(queryParams.sheetId, queryParams.sheetName);

            sheet.init().build();
        } else {

            var content = d3.select('body')
                .append('div')
                .attr('class', 'input-sheet');

            set_document_title();

            plotLogo(content, self.isLoggedIn);

            var bannerText = '<div><h1>Build your own radar</h1><p>Once you\'ve <a href ="https://www.thoughtworks.com/radar/byor">created your Radar</a>, you can use this service' +
                ' to generate an <br />interactive version of your Technology Radar. Not sure how? <a href ="https://www.thoughtworks.com/radar/how-to-byor">Read this first.</a></p></div>';

            plotBanner(content, bannerText);

            if (self.isLoggedIn) {
                content
                    .append('div')
                    .attr('class', 'input-sheet__form');
                plotForm(content);
            } else {
                LoginForm.build(content);
            }

            plotFooter(content);

        }
    }
    self.build = function () {
        if (USE_AUTHENTICATION) {
            GoogleAuth.isAuthorized(function (isLoggedIn) {
                self.isLoggedIn = isLoggedIn;
                self.render();
            });
        } else {
            self.isLoggedIn = true;
            self.render();
        }
    };

    return self;
};

function set_document_title() {
    document.title = "Build your own Radar";
}

function plotLoading(content) {
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
}

function plotLogo(content) {
    const header = content.append('div')
        .attr('class', 'input-sheet__header');
    const logo = header.append('div')
        .attr('class', 'input-sheet__logo');

    logo.html('<a href="https://www.thoughtworks.com"><img src="/images/tw-logo.png" / ></a>');

    ProfileMenu.build(header);
}


function plotFooter(content) {
    content
        .append('div')
        .attr('id', 'footer')
        .append('div')
        .attr('class', 'footer-content')
        .append('p')
        .html('Powered by <a href="https://www.thoughtworks.com"> ThoughtWorks</a>. '
            + 'By using this service you agree to <a href="https://www.thoughtworks.com/radar/tos">ThoughtWorks\' terms of use</a>. '
            + 'You also agree to our <a href="https://www.thoughtworks.com/privacy-policy">privacy policy</a>, which describes how we will gather, use and protect any personal data contained in your public Google Sheet. '
            + 'This software is <a href="https://github.com/thoughtworks/build-your-own-radar">open source</a> and available for download and self-hosting.');
}

function plotBanner(content, text) {
    content.append('div')
        .attr('class', 'input-sheet__banner')
        .html(text);

}

function plotForm(content) {
    content.select('.input-sheet__form')
        .append('p')
        .html('<strong>Enter the URL of your <a href="https://www.thoughtworks.com/radar/how-to-byor" target="_blank">published</a> Google Sheet or CSV file below…</strong>');


    var form = content.select('.input-sheet__form').append('form')
        .attr('method', 'get');

    form.append('input')
        .attr('type', 'text')
        .attr('name', 'sheetId')
        .attr('placeholder', "e.g. https://docs.google.com/spreadsheets/d/<\sheetid\>")
        .attr('required', '');

    form.append('button')
        .attr('type', 'submit')
        .append('a')
        .attr('class', 'button')
        .text('Build my radar');

    form.append('p').html("<a href='https://www.thoughtworks.com/radar/how-to-byor'>Need help?</a>");
}

function plotErrorMessage(exception) {
    d3.selectAll(".loading").remove();
    var message = 'Oops! It seems like there are some problems with loading your data. ';

    if (exception instanceof MalformedDataError) {
        message = message.concat(exception.message);
    } else if (exception instanceof SheetNotFoundError) {
        message = exception.message;
    } else if (exception instanceof UnauthorizedError) {
        message = exception.message;
    } else {
        console.error(exception);
    }

    message = message.concat('<br/>', 'Please check <a href="https://www.thoughtworks.com/radar/how-to-byor">FAQs</a> for possible solutions.');

    d3.select('body')
        .append('div')
        .attr('class', 'error-container')
        .append('div')
        .attr('class', 'error-container__message')
        .append('p')
        .html(message);
}

module.exports = GoogleSheetInput;
