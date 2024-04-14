const _ = {
  map: require('lodash/map'),
  uniqBy: require('lodash/uniqBy'),
  capitalize: require('lodash/capitalize'),
  each: require('lodash/each'),
};

const MalformedDataError = require('../../src/exceptions/malformedDataError');
const ExceptionMessages = require('./exceptionMessages');

// biome-ignore lint/complexity/useArrowFunction: applying fix breaks the code
const ContentValidator = function (columnNames) {
  var self = {};
  columnNames = columnNames.map((columnName) => columnName.trim());

  self.verifyContent = () => {
    if (columnNames.length === 0) {
      throw new MalformedDataError(ExceptionMessages.MISSING_CONTENT);
    }
  };

  self.verifyHeaders = () => {
    _.each(['name', 'ring', 'quadrant', 'isNew', 'description'], (field) => {
      if (columnNames.indexOf(field) === -1) {
        throw new MalformedDataError(ExceptionMessages.MISSING_HEADERS);
      }
    });
  };

  return self;
};

module.exports = ContentValidator;
