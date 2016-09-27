tr.util.InputSanitizer = function() {
    var relaxedOptions = {
                        allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'h1'],
                        allowedAttributes: {
                          'a': [ 'href' ]
                        }
                   };

   var restrictedOptions = {
                           allowedTags: [],
                           allowedAttributes: {}
                      };

    var self = {};
    self.sanitize = function(blip) {
        blip.description = sanitizeHtml(blip.description, relaxedOptions);
        blip.Name = sanitizeHtml(blip.Name, restrictedOptions);

        return blip;
    }

    return self;
}