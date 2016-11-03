const SheetNotFoundError = require('../../src/exceptions/sheetNotFoundError');

const SheetValidator = function (sheetId) {
    var self = {};

    self.verifySheet = function () {
        var sheetUrl = '';
        if (sheetId.trim().startsWith("http")) {
            sheetUrl = sheetId;
        } else {
            sheetUrl = "https://spreadsheets.google.com/feeds/worksheets/" + sheetId + "/public/basic?alt=json";
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", sheetUrl, false);
        xmlhttp.withCredentials = false;
        xmlhttp.send(null);
        if (xmlhttp.status == 400) {
            throw new SheetNotFoundError();
        }
    };
    return self;
};

module.exports = SheetValidator;

