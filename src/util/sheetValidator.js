const SheetNotFoundError = require('../../src/exceptions/sheetNotFoundError');
const ExceptionMessages = require('./exceptionMessages');

const SheetValidator = function (sheetReference) {
    var self = {};

    self.verifySheet = function () {
        var sheetId = '';
        if (sheetReference.trim().startsWith("http")) {
            var result = sheetReference.match("d\\/(.*?)\\/pubhtml");
            if(result === null) {
                throw new SheetNotFoundError(ExceptionMessages.SHEET_NOT_FOUND);
            }
            sheetId = result[1];

        } else {
            sheetId = sheetReference;
        }

        var sheetUrl = "https://spreadsheets.google.com/feeds/worksheets/" + sheetId + "/public/basic?alt=json";

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", sheetUrl, false);
        xmlhttp.withCredentials = false;
        xmlhttp.send(null);
        if (xmlhttp.status == 400) {
            throw new SheetNotFoundError(ExceptionMessages.SHEET_NOT_FOUND);
        }
    };
    return self;
};

module.exports = SheetValidator;

