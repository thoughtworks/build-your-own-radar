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

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function plotBlips(cycles, blips, adjustX, adjustY) {
    cycles.forEach(function (cycle, i) {
      var maxRadius, minRadius, cycleBlips;

      maxRadius = getRadius(cycles, i);
      minRadius = (i == cycles.length - 1) ? 0: getRadius(cycles, i + 1);

      var cycleBlips = blips.filter(function (blip) {
        return blip.cycle() == cycle;
      });

      cycleBlips.forEach(function (blip) {
        var angleInRad, radius;

        angleInRad = Math.PI * random(5, 85) / 180;
        radius = random(minRadius + 5, maxRadius - 5);

        svg.append('circle')
          .attr('cx', center() + radius * Math.cos(angleInRad) * adjustX)
          .attr('cy', center() + radius * Math.sin(angleInRad) * adjustY)
          .attr('r', 5)
          .append('title').text(blip.name());
      });
    });
  };

  self.plot = function () {
    var cycles = radar.cycles().reverse();

    plotCircles(cycles);
    plotLines();
    plotTexts(cycles);
    plotBlips(cycles, radar.quadrants().I.blips(), 1, -1);
    plotBlips(cycles, radar.quadrants().II.blips(), -1, -1);
    plotBlips(cycles, radar.quadrants().III.blips(), -1, 1);
    plotBlips(cycles, radar.quadrants().IV.blips(), 1, 1);
  };

  return self;
};
