const _ = {
  map: require('lodash/map'),
  uniqBy: require('lodash/uniqBy'),
  capitalize: require('lodash/capitalize'),
  each: require('lodash/each')
};

const MalformedDataError = require('../../src/exceptions/malformedDataError');

const ContentValidator = function (columnNames) {
  var columnNames = columnNames;
  var self = {};

  self.verifyContent = function() {
    if(columnNames.length == 0){
      throw new MalformedDataError('Document is missing content.');
    }
  };

  self.verifyHeaders = function() {
    _.each(['name', 'ring', 'quadrant', 'isNew', 'description'], function (field) {
      if (columnNames.indexOf(field) == -1) {
        throw new MalformedDataError('Document is missing one or more required headers or they are misspelled. ' +
          'Check that your document contains headers for "name", "ring", "quadrant", "isNew", "description".');
      }
    });
  };

  return self;
};

module.exports = ContentValidator;
