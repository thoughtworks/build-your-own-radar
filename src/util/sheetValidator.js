const SheetNotFoundError = require('../../src/exceptions/sheetNotFoundError');

const SheetValidator = function (sheetId) {
    var self = {};

    self.verifySheet = function() {
        var sheetUrl = '';
        if(sheetId.trim().startsWith("http")) {
            sheetUrl = sheetId;
        } else {
            sheetUrl = "https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=" + sheetId + "&output=html&widget=true";
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", sheetUrl, true);
        xmlhttp.send(null);

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 400) {
                    console.log("error");
                    throw new SheetNotFoundError("Sheet not found");
                }
            }
        };
    };
    return self;
};

module.exports = SheetValidator;

