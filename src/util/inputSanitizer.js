const sanitizeHtml = require('sanitize-html');

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
        textFilter: function(text) {
              return text.replace(/&amp;/, '&');
            }
    };

    var self = {};
    self.sanitize = function (blip) {
        blip.description = sanitizeHtml(blip.description, relaxedOptions);
        blip.name = sanitizeHtml(blip.name, restrictedOptions);
        blip.isNew = sanitizeHtml(blip.isNew, restrictedOptions);
        blip.ring = sanitizeHtml(blip.ring, restrictedOptions);
        blip.quadrant = sanitizeHtml(blip.quadrant, restrictedOptions);

        return blip;
    };

    return self;
};

module.exports = InputSanitizer;