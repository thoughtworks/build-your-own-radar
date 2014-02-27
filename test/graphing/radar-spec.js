describe('tr.graphing.Radar', function () {
  var radar;

  beforeEach(function () {
    radar = new tr.models.Radar();
    spyOn(radar, 'cycles').andReturn([]);
  });

  it('sets the size', function () {
    var svg, radarGraph;

    radarGraph = new tr.graphing.Radar(500, radar);
    svg = radarGraph.svg;
    spyOn(svg, 'attr').andReturn(svg);

    radarGraph.plot();

    expect(svg.attr).toHaveBeenCalledWith('width', 500);
    expect(svg.attr).toHaveBeenCalledWith('height', 500);
  });

  describe('lines', function () {
    it('plots a vertical line in the center', function () {
      var radarGraph, svg;

      radarGraph = new tr.graphing.Radar(500, radar);

      svg = radarGraph.svg;
      spyOn(svg, 'append').andReturn(svg);
      spyOn(svg, 'attr').andReturn(svg);

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
      svg = radarGraph.svg;
      spyOn(svg, 'append').andReturn(svg);
      spyOn(svg, 'attr').andReturn(svg);

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
      spyOn(radar, 'cycles').andReturn([
        new tr.models.Cycle('Adopt'),
        new tr.models.Cycle('Hold')
      ]);
      radarGraph = new tr.graphing.Radar(500, radar);
      svg = radarGraph.svg;
      spyOn(svg, 'append').andReturn(svg);
      spyOn(svg, 'attr').andReturn(svg);
    });

    it('plots the circles for the cycles', function () {
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

    it('adds the name of each cycle for the right side', function () {
      var center = 500 / 2;
      spyOn(svg, 'text').andReturn(svg);
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

    it('adds the name of each cycle for the right side', function () {
      var center = 500 / 2;
      spyOn(svg, 'text').andReturn(svg);
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
