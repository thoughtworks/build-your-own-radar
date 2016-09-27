describe('tr.util.InputSanitizer', function(){
    var sanitizer, blip;

    beforeAll(function(){
        sanitizer = new tr.util.InputSanitizer();
        var description = "Hello <script>alert('dangerous');</script>there <h1>heading</h1>";
        blip = {
                        Name: "Hello <script>alert('dangerous');</script>there <h1>blip</h1>",
                        description: description,
                        cycle: 'Adopt',
                        quadrant: 'techniques',
                        isNew: 'true'
                    }
    });

    it('strips out script tags from blip descriptions', function(){
        var result = sanitizer.sanitize(blip);

        expect(result.description).toEqual("Hello there <h1>heading</h1>");
    });

    it('strips out all tags from blip name', function(){
        var result = sanitizer.sanitize(blip);

        expect(result.Name).toEqual("Hello there blip");
    });
});
