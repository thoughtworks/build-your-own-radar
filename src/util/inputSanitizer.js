tr.util.inputSanitizer = function() {
    var options = {
                        allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
                        allowedAttributes: {
                          'a': [ 'href' ]
                        }
                   };
    var self = {};
    self.sanitizeDescription = function(description) {
        return sanitizeHtml(description,options);
    }

    return self;
}