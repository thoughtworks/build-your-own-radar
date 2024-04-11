const ContentValidator = require('../../src/util/contentValidator');
const MalformedDataError = require('../../src/exceptions/malformedDataError');
const ExceptionMessages = require('../../src/util/exceptionMessages');

describe('ContentValidator', () => {
  describe('verifyContent', () => {
    it('does not return anything if content is valid', () => {
      var columnNames = ['name', 'ring', 'quadrant', 'isNew', 'description'];
      var contentValidator = new ContentValidator(columnNames);

      expect(contentValidator.verifyContent()).not.toBeDefined();
    });

    it('raises an error if content is empty', () => {
      var columnNames = [];
      var contentValidator = new ContentValidator(columnNames);

      expect(() => {
        contentValidator.verifyContent();
      }).toThrow(new MalformedDataError(ExceptionMessages.MISSING_CONTENT));
    });
  });

  describe('verifyHeaders', () => {
    it('raises an error if one of the headers is empty', () => {
      var columnNames = ['ring', 'quadrant', 'isNew', 'description'];
      var contentValidator = new ContentValidator(columnNames);

      expect(() => {
        contentValidator.verifyHeaders();
      }).toThrow(new MalformedDataError(ExceptionMessages.MISSING_HEADERS));
    });

    it('does not return anything if the all required headers are present', () => {
      var columnNames = ['name', 'ring', 'quadrant', 'isNew', 'description'];
      var contentValidator = new ContentValidator(columnNames);

      expect(contentValidator.verifyHeaders()).not.toBeDefined();
    });

    it('does not care about white spaces in the headers', () => {
      var columnNames = [
        ' name',
        'ring ',
        '   quadrant',
        'isNew   ',
        '   description   ',
      ];
      var contentValidator = new ContentValidator(columnNames);

      expect(contentValidator.verifyHeaders()).not.toBeDefined();
    });
  });
});
