const Sheet = require('../../src/util/sheet');

describe('sheet', function () {
    var sheet;
    var caller = {callback: function (){}};

    beforeAll(function () {
        spyOn(caller, 'callback');
    });

    it('knows to find the sheet id from published URL', function () {
        sheet = new Sheet('https://docs.google.com/spreadsheets/' +
            'd/1YXkrgV7Y6zShiPeyw4Y5_19QOfu5I6CyH5sGnbkEyiI/pubhtml');

        expect(sheet.id).toEqual('1YXkrgV7Y6zShiPeyw4Y5_19QOfu5I6CyH5sGnbkEyiI');
    });

    it('knows to find the sheet id from publicly shared URL having query params', function () {
        sheet = new Sheet('https://docs.google.com/spreadsheets/' +
            'd/1wLRmV2tVlS5PqjKFyiTA0HuoH8vp_h_DOmjciZAEG0U?abc=xyz');

        expect(sheet.id).toEqual('1wLRmV2tVlS5PqjKFyiTA0HuoH8vp_h_DOmjciZAEG0U');
    });

    it('knows to find the sheet id from publicly shared URL having extra path and query params', function () {
        sheet = new Sheet('https://docs.google.com/spreadsheets/' +
            'd/1wLRmV2tVlS5PqjKFyiTA0HuoH8vp_h_DOmjciZAEG0U/edit?usp=sharing');

        expect(sheet.id).toEqual('1wLRmV2tVlS5PqjKFyiTA0HuoH8vp_h_DOmjciZAEG0U');
    });

    it('knows to find the sheet id from publicly shared URL having no extra path or query params', function () {
        sheet = new Sheet('https://docs.google.com/spreadsheets/' +
            'd/1wLRmV2tVlS5PqjKFyiTA0HuoH8vp_h_DOmjciZAEG0U');

        expect(sheet.id).toEqual('1wLRmV2tVlS5PqjKFyiTA0HuoH8vp_h_DOmjciZAEG0U');
    });

    it('knows to find the sheet id from publicly shared URL with trailing slash', function () {
        sheet = new Sheet('https://docs.google.com/spreadsheets/' +
            'd/1wLRmV2tVlS5PqjKFyiTA0HuoH8vp_h_DOmjciZAEG0U/');

        expect(sheet.id).toEqual('1wLRmV2tVlS5PqjKFyiTA0HuoH8vp_h_DOmjciZAEG0U');
    });

    it('can identify a plain sheet ID', function () {
        sheet = new Sheet('1wLRmV2tVlS5PqjKFyiTA0HuoH8vp_h_DOmjciZAEG0U');

        expect(sheet.id).toEqual('1wLRmV2tVlS5PqjKFyiTA0HuoH8vp_h_DOmjciZAEG0U');
    });

    xit('calls back with nothing if the sheet exists', function () {
        sheet = new Sheet('http://example.com/a/b/c/d/?x=y');
        sheet.exists(caller.callback);

        expect(caller.callback).toHaveBeenCalledWith(undefined);
    });

    xit('calls back with error if sheet the sheet does not exist', function () {
        sheet = new Sheet('http://example.com/a/b/c/d/?x=y');
        sheet.exists(caller.callback);

        expect(caller.callback).toHaveBeenCalledWith('Some error');
    });
});