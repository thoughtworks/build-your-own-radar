tr.graphing.Radar = function (size, radar) {
  var self, fib, svg;

  fib = new tr.util.Fib();

  self = {};
  self.svg = function () {
    return svg;
  }

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
        .attr('class', 'line-text')
        .attr('y', center() + 4)
        .attr('x', center() - getRadius(cycles, i) + 10)
        .text(cycle.name());

      svg.append('text')
        .attr('class', 'line-text')
        .attr('y', center() + 4)
        .attr('x', center() + getRadius(cycles, i) - 10)
        .attr('text-anchor', 'end')
        .text(cycle.name());
    });
  };

  function triangle(x, y, cssClass) {
    return svg.append('path')
      .attr('d', 'M412.201,311.406c0.021,0,0.042,0,0.063,0c0.067,0,0.135,0,0.201,0c4.052,0,6.106-0.051,8.168-0.102c2.053-0.051,4.115-0.102,8.176-0.102h0.103c6.976-0.183,10.227-5.306,6.306-11.53c-3.988-6.121-4.97-5.407-8.598-11.224c-1.631-3.008-3.872-4.577-6.179-4.577c-2.276,0-4.613,1.528-6.48,4.699c-3.578,6.077-3.26,6.014-7.306,11.723C402.598,306.067,405.426,311.406,412.201,311.406')
      .attr('transform', 'translate(' + ((-421 * .73) + x) + ',' + ((-299 * 0.73) + y) + ') scale(0.73) ')
      .attr('class', cssClass)
      .attr('stroke-width', 2);

    var tsize = 7

    var top = y - tsize + 2;
    var left = (x - tsize);
    var right = (x + tsize);
    var bottom = (y + tsize);

    var points = x + ',' + top + ' ' + left + ',' + bottom + ' ' + right + ',' + bottom;
  }

  function circle(x, y, cssClass) {
    svg.append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('class', cssClass)
      .attr('stroke-width', 1.5)
      .attr('r', 10);
  }

  function plotBlips(cycles, quadrant, adjustX, adjustY) {
    var blips;
    blips = quadrant.blips();
    cycles.forEach(function (cycle, i) {
      var maxRadius, minRadius, cycleBlips;

      maxRadius = getRadius(cycles, i);
      minRadius = (i == cycles.length - 1) ? 0: getRadius(cycles, i + 1);

      var cycleBlips = blips.filter(function (blip) {
        return blip.cycle() == cycle;
      });

      cycleBlips.forEach(function (blip) {
        var angleInRad, radius;

        var split = blip.name().split('');
        var sum = split.reduce(function (p, c) { return p + c.charCodeAt(0); }, 0);
        chance = new Chance(sum * cycle.name().length * blip.number());

        angleInRad = Math.PI * chance.integer({ min: 13, max: 85 }) / 180;
        radius = chance.floating({ min: minRadius + 25, max: maxRadius - 10 });

        var x = center() + radius * Math.cos(angleInRad) * adjustX;
        var y = center() + radius * Math.sin(angleInRad) * adjustY;

        if (blip.isNew()) {
          triangle(x, y, cssClassFor(quadrant.name()));
        } else {
          circle(x, y, cssClassFor(quadrant.name()));
        }

        svg.append('text')
          .attr('x', x)
          .attr('y', y + 4)
          .attr('class', 'blip-text')
          .attr('text-anchor', 'middle')
          .text(blip.number())
      });
    });
  };

  function cssClassFor(string) {
    return string.toLowerCase().replace(/\s\&/g, '').replace(/\s/g, '-');
  }

  function plotQuadrantNames(quadrants) {
    function plotName(name, anchor, x, y) {
      svg.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('class', cssClassFor(name))
        .attr('text-anchor', anchor)
        .text(name);
    }

    plotName(quadrants.I.name(), 'end', size - 10, 10)
    plotName(quadrants.II.name(), 'start', 10, 10)
    plotName(quadrants.III.name(), 'start', 10, size - 10)
    plotName(quadrants.IV.name(), 'end', size -10, size - 10)
  }

  self.init = function (selector) {
    svg = d3.select(selector || 'body').append("svg");
    return self;
  };

  self.plot = function () {
    var cycles, quadrants;

    cycles = radar.cycles().reverse();
    quadrants = radar.quadrants();

    svg.attr('width', size).attr('height', size);

    plotCircles(cycles);
    plotLines();
    plotTexts(cycles);

    if (radar.hasQuadrants()) {
      plotQuadrantNames(quadrants);
      plotBlips(cycles, quadrants.I, 1, -1);
      plotBlips(cycles, quadrants.II, -1, -1);
      plotBlips(cycles, quadrants.III, -1, 1);
      plotBlips(cycles, quadrants.IV, 1, 1);
    }
  };

  return self;
};
