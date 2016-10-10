// This references very old code that no longer exists
// the tests for graphing will have to be rewritten
require('../../src/graphing/radar.js');


xdescribe('tr.graphing.Radar', function () {
  var radar;

  beforeEach(function () {
    radar = new tr.models.Radar();
    spyOn(radar, 'rings').and.returnValue([]);
  });

  describe('init', function () {
    it('appends the svg', function () {
      var radarGraph, selection;

      radarGraph = new tr.graphing.Radar(500, radar);
      selection = { append: jasmine.createSpy() };
      spyOn(d3, 'select').and.returnValue(selection);

      radarGraph.init();

      expect(selection.append).toHaveBeenCalledWith('svg');
    });

    it('selects body if no selector provided', function () {
      var radarGraph;

      radarGraph = new tr.graphing.Radar(500, radar);
      spyOn(d3, 'select').and.callThrough();

      radarGraph.init();

      expect(d3.select).toHaveBeenCalledWith('body');
    });

    it('selects the selector if provided', function () {
      var radarGraph;

      radarGraph = new tr.graphing.Radar(500, radar);
      spyOn(d3, 'select').and.callThrough();

      radarGraph.init('#radar');

      expect(d3.select).toHaveBeenCalledWith('#radar');
    });
  });

  it('sets the size', function () {
    var svg, radarGraph;

    radarGraph = new tr.graphing.Radar(500, radar);
    radarGraph.init();

    svg = radarGraph.svg();
    spyOn(svg, 'attr').and.returnValue(svg);

    radarGraph.plot();

    expect(svg.attr).toHaveBeenCalledWith('width', 500);
    expect(svg.attr).toHaveBeenCalledWith('height', 500);
  });

  describe('lines', function () {
    it('plots a vertical line in the center', function () {
      var radarGraph, svg;

      radarGraph = new tr.graphing.Radar(500, radar);
      radarGraph.init();

      svg = radarGraph.svg();
      spyOn(svg, 'append').and.returnValue(svg);
      spyOn(svg, 'attr').and.returnValue(svg);

      radarGraph.plot();

      expect(svg.append).toHaveBeenCalledWith('line');
      expect(svg.attr).toHaveBeenCalledWith('x1', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('y1', 0);
      expect(svg.attr).toHaveBeenCalledWith('x2', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('y2', 500);
      expect(svg.attr).toHaveBeenCalledWith('stroke-width', 14);
    });

    it('plots a horizontal line in the center', function () {
      var svg, radarGraph;

      radarGraph = new tr.graphing.Radar(500, radar);
      radarGraph.init();

      svg = radarGraph.svg();
      spyOn(svg, 'append').and.returnValue(svg);
      spyOn(svg, 'attr').and.returnValue(svg);

      radarGraph.plot();

      expect(svg.append).toHaveBeenCalledWith('line');
      expect(svg.attr).toHaveBeenCalledWith('x1', 0);
      expect(svg.attr).toHaveBeenCalledWith('y1', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('x2', 500);
      expect(svg.attr).toHaveBeenCalledWith('y2', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('stroke-width', 14);
    });
  });

  describe('circles', function () {
    var svg, radarGraph;

    beforeEach(function () {
      var radar;

      radar = new tr.models.Radar();
      spyOn(radar, 'rings').and.returnValue([
        new tr.models.Ring('Adopt'),
        new tr.models.Ring('Hold')
      ]);
      radarGraph = new tr.graphing.Radar(500, radar);
      radarGraph.init();

      svg = radarGraph.svg();
      spyOn(svg, 'append').and.returnValue(svg);
      spyOn(svg, 'attr').and.returnValue(svg);
    });

    it('plots the circles for the rings', function () {
      radarGraph.plot();

      expect(svg.append).toHaveBeenCalledWith('circle');
      expect(svg.attr).toHaveBeenCalledWith('cx', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('cy', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('r', Math.round(250 / 2));

      expect(svg.append).toHaveBeenCalledWith('circle');
      expect(svg.attr).toHaveBeenCalledWith('cx', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('cy', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('r', 250);
    });

    it('adds the name of each ring for the right side', function () {
      var center = 500 / 2;
      spyOn(svg, 'text').and.returnValue(svg);
      radarGraph.plot();

      expect(svg.append).toHaveBeenCalledWith('text');
      expect(svg.attr).toHaveBeenCalledWith('y', center + 4);
      expect(svg.attr).toHaveBeenCalledWith('x', 0 + 10);
      expect(svg.text).toHaveBeenCalledWith('Adopt');

      expect(svg.append).toHaveBeenCalledWith('text');
      expect(svg.attr).toHaveBeenCalledWith('y', center + 4);
      expect(svg.attr).toHaveBeenCalledWith('x', 0 + (center / 2) + 10);
      expect(svg.text).toHaveBeenCalledWith('Hold');
    });

    it('adds the name of each ring for the right side', function () {
      var center = 500 / 2;
      spyOn(svg, 'text').and.returnValue(svg);
      radarGraph.plot();

      expect(svg.append).toHaveBeenCalledWith('text');
      expect(svg.attr).toHaveBeenCalledWith('y', center + 4);
      expect(svg.attr).toHaveBeenCalledWith('x', 500 - 10);
      expect(svg.attr).toHaveBeenCalledWith('text-anchor', 'end');
      expect(svg.text).toHaveBeenCalledWith('Adopt');

      expect(svg.append).toHaveBeenCalledWith('text');
      expect(svg.attr).toHaveBeenCalledWith('y', center + 4);
      expect(svg.attr).toHaveBeenCalledWith('x', 500 - (center / 2) - 10);
      expect(svg.attr).toHaveBeenCalledWith('text-anchor', 'end');
      expect(svg.text).toHaveBeenCalledWith('Hold');
    });
  });
});
