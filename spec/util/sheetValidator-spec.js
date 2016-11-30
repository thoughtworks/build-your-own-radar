const SheetValidator = require('../../src/util/sheetValidator');
XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


describe('sheetValidator', function(){
  var sheetValidator;

  it('errors when the http link is invalid', function(){
    sheetValidator = new SheetValidator('https://wronglink.com');
    expect(sheetValidator.verifySheet).toThrow();
  });

  it('does not error when passed a valid published sheet', function(){
    sheetValidator = new SheetValidator('https://docs.google.com/spreadsheets/d/1YXkrgV7Y6zShiPeyw4Y5_19QOfu5I6CyH5sGnbkEyiI/pubhtml');
    expect(sheetValidator.verifySheet).not.toThrow();
  });

  it('does not error when passed a valid publicly shared sheet', function(){
    sheetValidator = new SheetValidator('https://docs.google.com/spreadsheets/d/1j30CkEXe2ct9dw3E1kyltRYgZ1kHrUbhq-KO2OnreQ0/edit?usp=sharing');
    expect(sheetValidator.verifySheet).not.toThrow();
  });

});