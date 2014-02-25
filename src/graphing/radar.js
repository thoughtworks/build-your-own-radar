tr.graphing.Radar = function (svg, size, radar) {
  var self = {};

  svg.attr('width', size).attr('height', size);

  function plotLines() {
    svg.append('line')
      .attr('x1', size / 2)
      .attr('y1', 0)
      .attr('x2', size / 2)
      .attr('y2', size)
      .attr('stroke-width', 5);
  };

  self.plot = function () {
    plotLines();

  };

  return self;
};
