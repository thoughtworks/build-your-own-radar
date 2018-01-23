const SheetNotFoundError = require('../../src/exceptions/sheetNotFoundError');
const ExceptionMessages = require('./exceptionMessages');

const Sheet = function (sheetReference) {
    var self = {};

    (function () {
        var matches = sheetReference.match("https:\\/\\/docs.google.com\\/spreadsheets\\/d\\/(.*?)($|\\/$|\\/.*|\\?.*)");
        self.id = matches !== null ? matches[1] : sheetReference;
    })();

    self.getSheet = function () {
        return gapi.client.sheets.spreadsheets.get({ spreadsheetId: self.id });
    }

    self.getData = function (range) {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: self.id,
            range: range,
        });
    };

    return self;
};

module.exports = Sheet;
