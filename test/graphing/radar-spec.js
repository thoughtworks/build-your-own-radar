describe('tr.graphing.Radar', function () {
  function buildSvg() {
    return d3.select("body").append("svg");
  }

  it('sets the size', function () {
    var svg = buildSvg();
    spyOn(svg, 'attr').andReturn(svg);

    var radarGraph = new tr.graphing.Radar(svg, 500);

    expect(svg.attr).toHaveBeenCalledWith('width', 500);
    expect(svg.attr).toHaveBeenCalledWith('height', 500);
  });

  describe('lines', function () {
    it('plots a vertical line in the center', function () {
      var svg = buildSvg();
      spyOn(svg, 'append').andReturn(svg);
      spyOn(svg, 'attr').andReturn(svg);

      var radarGraph = new tr.graphing.Radar(svg, 500);

      radarGraph.plot();

      expect(svg.append).toHaveBeenCalledWith('line');
      expect(svg.attr).toHaveBeenCalledWith('x1', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('y1', 0);
      expect(svg.attr).toHaveBeenCalledWith('x2', 500 / 2);
      expect(svg.attr).toHaveBeenCalledWith('y2', 500);
      expect(svg.attr).toHaveBeenCalledWith('stroke-width', 5);
    });
  })
});
