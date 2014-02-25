tr.graphing.Radar = function (svg, size, radar) {
  var self = {};

  svg.attr('width', size).attr('height', size);

  function plotLines() {
    var center = Math.round(size / 2);

    svg.append('line')
      .attr('x1', center)
      .attr('y1', 0)
      .attr('x2', center)
      .attr('y2', size)
      .attr('stroke-width', 5);

    svg.append('line')
      .attr('x1', 0)
      .attr('y1', center)
      .attr('x2', size)
      .attr('y2', center)
      .attr('stroke-width', 5);
  };

  function plotCircles() {
    var center, cycles, increment;

    center = Math.round(size / 2);
    cycles = radar.cycles();
    increment = Math.round(center / cycles.length);

    cycles.forEach(function (cycle, i) {
      svg.append('circle')
        .attr('cx', center)
        .attr('cy', center)
        .attr('r', (i + 1) * increment);
    });
  }

  self.plot = function () {
    plotLines();
    plotCircles();
  };

  return self;
};
