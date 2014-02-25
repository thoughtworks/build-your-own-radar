describe('tr.graphing.Radar', function () {
  var radar;

  function buildSvg() {
    return d3.select("body").append("svg");
  }

  beforeEach(function () {
    radar = new tr.models.Radar();
    spyOn(radar, 'cycles').andReturn([]);
  });

  it('sets the size', function () {
    var svg = buildSvg();
    spyOn(svg, 'attr').andReturn(svg);

    var radarGraph = new tr.graphing.Radar(svg, 500, radar);

    expect(svg.attr).toHaveBeenCalledWith('width', 500);
    expect(svg.attr).toHaveBeenCalledWith('height', 500);
  });

  describe('lines', function () {
    it('plots a vertical line in the center', function () {
      var svg = buildSvg();
      spyOn(svg, 'append').andReturn(svg);
      spyOn(svg, 'attr').andReturn(svg);

      var radarGraph = new tr.graphing.Radar(svg, 500, radar);

      radarGraph.plot();

      expect(svg.append).toHaveBeenCalledWith('line');
      expect(svg.attr).toHaveBeenCalledWith('x1', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('y1', 0);
      expect(svg.attr).toHaveBeenCalledWith('x2', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('y2', 500);
      expect(svg.attr).toHaveBeenCalledWith('stroke-width', 5);
    });

    it('plots a horizontal line in the center', function () {
      var svg = buildSvg();
      spyOn(svg, 'append').andReturn(svg);
      spyOn(svg, 'attr').andReturn(svg);

      var radarGraph = new tr.graphing.Radar(svg, 500, radar);

      radarGraph.plot();

      expect(svg.append).toHaveBeenCalledWith('line');
      expect(svg.attr).toHaveBeenCalledWith('x1', 0);
      expect(svg.attr).toHaveBeenCalledWith('y1', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('x2', 500);
      expect(svg.attr).toHaveBeenCalledWith('y2', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('stroke-width', 5);
    });
  });

  describe('circles', function () {
    var svg, radarGraph;

    beforeEach(function () {
      var radar;

      svg = buildSvg();
      spyOn(svg, 'append').andReturn(svg);
      spyOn(svg, 'attr').andReturn(svg);

      radar = new tr.models.Radar();
      spyOn(radar, 'cycles').andReturn([
        new tr.models.Cycle('Adopt'),
        new tr.models.Cycle('Hold')
      ]);
      radarGraph = new tr.graphing.Radar(svg, 500, radar);
    });

    it('plots the circles for the cicles', function () {
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
  });
});
