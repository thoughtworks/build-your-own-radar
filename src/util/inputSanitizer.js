tr.util.InputSanitizer = function() {
    var options = {
                        allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'h1'],
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