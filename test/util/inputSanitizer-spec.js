describe('tr.util.InputSanitizer', function(){

    it('strips out script tags from blip descriptions', function(){
        sanitizer = new tr.util.InputSanitizer();

        var description = "Hello <script>alert('dangerous');</script>there <h1>heading</h1>";
        var result = sanitizer.sanitizeDescription(description);

        expect(result).toEqual("Hello there <h1>heading</h1>");
    });
});
