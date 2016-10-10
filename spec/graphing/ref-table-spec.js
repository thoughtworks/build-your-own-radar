const Quadrant = require('../../src/models/quadrant.js');
const Ring = require('../../src/models/ring.js');
const Blip = require('../../src/models/blip.js');
const Radar = require('../../src/models/radar.js');

describe('graphingRadar', function () {
    var radar, toolsQuadrant, techniquesQuadrant, platformsQuadrant, languageFramework, element;

    beforeEach(function () {
        toolsQuadrant = new Quadrant('Tools');
        techniquesQuadrant = new Quadrant('Techniques');
        platformsQuadrant = new Quadrant('Platforms');
        languageFramework = new Quadrant('Languages');

        radar = new Radar();
        radar.addQuadrant(toolsQuadrant);
        radar.addQuadrant(techniquesQuadrant);
        radar.addQuadrant(platformsQuadrant);
        radar.addQuadrant(languageFramework);

        element = { innerHTML: '' };
        spyOn(document, 'querySelector').and.returnValue(element);
    });

    xdescribe('render', function () {
        it("groups blips by ring", function () {
            var adopt = new Ring('Adopt');
            var assess = new Ring('Assess');

            toolsQuadrant.add([
                new Blip('foo', adopt, true, 'this is foo'),
                new Blip('bar', assess, true, 'this is bar'),
                new Blip('baz', adopt, true, 'this is baz')
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

        it("respects the assigned order of rings", function () {
            var adopt = new Ring('Adopt', 1);
            var assess = new Ring('Assess', 3);
            var hold = new Ring('Hold', 2);

            toolsQuadrant.add([
                new Blip('foo', adopt, true, 'this is foo'),
                new Blip('bar', assess, true, 'this is bar'),
                new Blip('baz', hold, true, 'this is baz')
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
