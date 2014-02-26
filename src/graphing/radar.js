tr.graphing.Radar = function (svg, size, radar) {
  var self, fib;
  self = {};
  fib = new tr.util.Fib();

  svg.attr('width', size).attr('height', size);

  function center () {
    return Math.round(size/2);
  }

  function plotLines() {
    svg.append('line')
      .attr('x1', center())
      .attr('y1', 0)
      .attr('x2', center())
      .attr('y2', size)
      .attr('stroke-width', 14);

    svg.append('line')
      .attr('x1', 0)
      .attr('y1', center())
      .attr('x2', size)
      .attr('y2', center())
      .attr('stroke-width', 14);
  };

  function getRadius(cycles, i) {
    var sequence = fib.sequence(cycles.length);
    var total = fib.sum(cycles.length);
    var sum = fib.sum(i);

    return center() - (center() * sum / total);
  }

  function plotCircles(cycles) {
    var increment;

    cycles.forEach(function (cycle, i) {
      svg.append('circle')
        .attr('cx', center())
        .attr('cy', center())
        .attr('r', getRadius(cycles, i));
    });
  }

  function plotTexts(cycles) {
    var increment;

    increment = Math.round(center() / cycles.length);

    cycles.forEach(function (cycle, i) {
      svg.append('text')
        .attr('y', center() + 4)
        .attr('x', center() - getRadius(cycles, i) + 10)
        .text(cycle.name());

      svg.append('text')
        .attr('y', center() + 4)
        .attr('x', center() + getRadius(cycles, i) - 10)
        .attr('text-anchor', 'end')
        .text(cycle.name());
    });
  };

  self.plot = function () {
    var cycles = radar.cycles().reverse();

    plotCircles(cycles);
    plotLines();
    plotTexts(cycles);
  };

  return self;
};
