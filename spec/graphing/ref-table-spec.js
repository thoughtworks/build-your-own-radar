// This references very old code that no longer exists
// the tests for graphing will have to be rewritten
xdescribe('tr.graphing.RefTable', function () {
    var radar, toolsQuadrant, techniquesQuadrant, platformsQuadrant, languageFramework, element;

    beforeEach(function () {
        toolsQuadrant = new tr.models.Quadrant('Tools');
        techniquesQuadrant = new tr.models.Quadrant('Techniques');
        platformsQuadrant = new tr.models.Quadrant('Platforms');
        languageFramework = new tr.models.Quadrant('Languages');

        radar = new tr.models.Radar();
        radar.addQuadrant(toolsQuadrant);
        radar.addQuadrant(techniquesQuadrant);
        radar.addQuadrant(platformsQuadrant);
        radar.addQuadrant(languageFramework);

        element = { innerHTML: '' };
        spyOn(document, 'querySelector').and.returnValue(element);
    });

    describe('render', function () {
        it("groups blips by cycle", function () {
            var adopt = new tr.models.Cycle('Adopt');
            var assess = new tr.models.Cycle('Assess');

            toolsQuadrant.add([
                new tr.models.Blip('foo', adopt, true, 'this is foo'),
                new tr.models.Blip('bar', assess, true, 'this is bar'),
                new tr.models.Blip('baz', adopt, true, 'this is baz')
            ]);

            var table = new tr.graphing.RefTable(radar);
            table.init('#some-id').render();

            expect(element.innerHTML).toEqual(
                '<table class="radar-ref-table">' +
                    '<tr class="radar-ref-status-group"><td colspan="3">Adopt</td></tr>' +
                    '<tr><td>-1</td><td>foo</td><td>this is foo</td></tr>' +
                    '<tr><td>-1</td><td>baz</td><td>this is baz</td></tr>' +
                    '<tr class="radar-ref-status-group"><td colspan="3">Assess</td></tr>' +
                    '<tr><td>-1</td><td>bar</td><td>this is bar</td></tr>' +
                '</table>');
        });

        it("respects the assigned order of cycles", function () {
            var adopt = new tr.models.Cycle('Adopt', 1);
            var assess = new tr.models.Cycle('Assess', 3);
            var hold = new tr.models.Cycle('Hold', 2);

            toolsQuadrant.add([
                new tr.models.Blip('foo', adopt, true, 'this is foo'),
                new tr.models.Blip('bar', assess, true, 'this is bar'),
                new tr.models.Blip('baz', hold, true, 'this is baz')
            ]);

            var table = new tr.graphing.RefTable(radar);
            table.init('#some-id').render();

            expect(element.innerHTML).toEqual(
                '<table class="radar-ref-table">' +
                    '<tr class="radar-ref-status-group"><td colspan="3">Adopt</td></tr>' +
                    '<tr><td>-1</td><td>foo</td><td>this is foo</td></tr>' +
                    '<tr class="radar-ref-status-group"><td colspan="3">Hold</td></tr>' +
                    '<tr><td>-1</td><td>baz</td><td>this is baz</td></tr>' +
                    '<tr class="radar-ref-status-group"><td colspan="3">Assess</td></tr>' +
                    '<tr><td>-1</td><td>bar</td><td>this is bar</td></tr>' +
                '</table>');
        });
    });
});
