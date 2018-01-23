const sanitizeHtml = require('sanitize-html');
const _ = {
  forOwn: require('lodash/forOwn')
}

const InputSanitizer = function () {
  var relaxedOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul',
      'br', 'p', 'u'],
    allowedAttributes: {
      'a': ['href']
    }
  };

  var restrictedOptions = {
    allowedTags: [],
    allowedAttributes: {},
    textFilter: function (text) {
      return text.replace(/&amp;/, '&');
    }
  };

  function trimWhiteSpaces(blip) {
    var processedBlip = {};
    _.forOwn(blip, function (value, key) {
      processedBlip[key.trim()] = value.trim();
    });
    return processedBlip;
  }

  var self = {};
  self.sanitize = function (rawBlip) {
    var rawBlip = trimWhiteSpaces(rawBlip);
    blip = {};

    blip.description = sanitizeHtml(rawBlip[4], relaxedOptions);
    blip.name = sanitizeHtml(rawBlip[0], restrictedOptions);
    blip.isNew = sanitizeHtml(rawBlip[3], restrictedOptions);
    blip.ring = sanitizeHtml(rawBlip[1], restrictedOptions);
    blip.quadrant = sanitizeHtml(rawBlip[2], restrictedOptions);

    return blip;
  };

  return self;
};

module.exports = InputSanitizer;
