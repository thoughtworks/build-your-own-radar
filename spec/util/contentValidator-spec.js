const ContentValidator = require('../../src/util/contentValidator');
const MalformedDataError = require('../../src/exceptions/malformedDataError');

describe('ContentValidator', function () {

  describe('verifyContent', function () {
    it('does not return anything if content is valid', function () {
      var columnNames = ["name", "ring", "quadrant", "isNew", "description"];
      var contentValidator = new ContentValidator(columnNames);

      expect(contentValidator.verifyContent()).not.toBeDefined();
    });

    it('raises an error if content is empty', function () {
      var columnNames = [];
      var contentValidator = new ContentValidator(columnNames);

      expect(function () {
        contentValidator.verifyContent()
      }).toThrow(new MalformedDataError('Document is missing content.'));
    });
  });

  describe('verifyHeaders', function () {

    it('raises an error if one of the headers is empty', function () {
      var columnNames = ['ring', 'quadrant', 'isNew', 'description'];
      var contentValidator = new ContentValidator(columnNames);

      expect(function () {
        contentValidator.verifyHeaders()
      }).toThrow(new MalformedDataError('Document is missing one or more required headers or they are misspelled. ' +
        'Check that your document contains headers for "name", "ring", "quadrant", "isNew", "description".'));
    });

    it('does not return anything if the all required headers are present', function () {
      var columnNames = ['name', 'ring', 'quadrant', 'isNew', 'description'];
      var contentValidator = new ContentValidator(columnNames);

      expect(contentValidator.verifyHeaders()).not.toBeDefined();
    });

  });
});

