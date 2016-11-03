const InputSanitizer = require('../../src/util/inputSanitizer');

describe('InputSanitizer', function(){
    var sanitizer, rawBlip, blip;

    beforeAll(function(){
        sanitizer = new InputSanitizer();
        var description = "<b>Hello</b> <script>alert('dangerous');</script>there <h1>heading</h1>";
        rawBlip = {
            name: "Hello <script>alert('dangerous');</script>there <h1>blip</h1>",
            description: description,
            ring: '<a href="/asd">Adopt</a>',
            quadrant: '<strong>techniques & tools</strong>',
            isNew: 'true<br>'
        };

        blip = sanitizer.sanitize(rawBlip);
    });

    it('strips out script tags from blip descriptions', function(){
        expect(blip.description).toEqual("<b>Hello</b> there <h1>heading</h1>");
    });

    it('strips out all tags from blip name', function(){
        expect(blip.name).toEqual("Hello there blip");
    });

    it('strips out all tags from blip status', function(){
        expect(blip.isNew).toEqual("true");
    });

    it('strips out all tags from blip ring', function(){
        expect(blip.ring).toEqual("Adopt");
    });

    it('strips out all tags from blip quadrant', function(){
        expect(blip.quadrant).toEqual("techniques & tools");
    });

    it('trims white spaces in keys and values', function() {
      rawBlip = {
          ' name': '   Some name ',
          '   ring ': '    Some ring name ',
      };
      blip = sanitizer.sanitize(rawBlip);

      expect(blip.name).toEqual('Some name');
      expect(blip.ring).toEqual('Some ring name');
    });
});
