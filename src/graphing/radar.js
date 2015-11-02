tr.graphing.Radar = function (size, radar, toolTipDescription) {
  var self, fib, svg, texts;

  texts = [];
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

  function triangle(x, y, cssClass, group) {
    var tsize, top, left, right, bottom, points;

    tsize = 13
    top = y - tsize;
    left = (x - tsize + 1);
    right = (x + tsize + 1);
    bottom = (y + tsize - tsize / 2.5);

    points = x + 1 + ',' + top + ' ' + left + ',' + bottom + ' ' + right + ',' + bottom;

    return (group || svg).append('polygon')
      .attr('points', points)
      .attr('class', cssClass)
      .attr('stroke-width', 1.5);
  }

  function circle(x, y, cssClass, group) {
    var w = 25;
    return (group || svg).append('path')
      .attr('d',"M420.084,282.092c-1.073,0-2.16,0.103-3.243,0.313c-6.912,1.345-13.188,8.587-11.423,16.874c1.732,8.141,8.632,13.711,17.806,13.711c0.025,0,0.052,0,0.074-0.003c0.551-0.025,1.395-0.011,2.225-0.109c4.404-0.534,8.148-2.218,10.069-6.487c1.747-3.886,2.114-7.993,0.913-12.118C434.379,286.944,427.494,282.092,420.084,282.092")
      .attr('transform','scale('+(w/34)+') translate('+(-404+x*(34/w)-17)+', '+(-282+y*(34/w)-17)+')')
      .attr('class', cssClass);
  }

  function plotBlips(cycles, quadrant, adjustX, adjustY, cssClass) {
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
        var chance = new Chance(sum * cycle.name().length * blip.number());

        angleInRad = Math.PI * chance.integer({ min: 13, max: 85 }) / 180;
        radius = chance.floating({ min: minRadius + 25, max: maxRadius - 10 });

        var x = center() + radius * Math.cos(angleInRad) * adjustX;
        var y = center() + radius * Math.sin(angleInRad) * adjustY;

        var group = svg.append('g').attr('class', 'blip-group');

        if (blip.isNew()) {
          triangle(x, y, cssClass, group);
        } else {
          circle(x, y, cssClass, group);
        }

        texts.push(function () {
          var name, background;

          name = svg.append('foreignObject')
            .attr('x', x + 35)
            .attr('y', y + 4)
            .attr('class', 'blip-name')
            .attr('text-anchor', 'left');
          name.append("xhtml:div")
            .html(blip.name());

          group
            .on('mouseover', function () { d3.selectAll('path').attr('opacity',0.3); group.selectAll('circle, path').attr('opacity',1.0); })
            .on('mouseout', function () { d3.selectAll('path').attr('opacity',1.0); });
        });

        group.append('text')
          .attr('x', x)
          .attr('y', y + 4)
          .attr('class', 'blip-text')
          .attr('text-anchor', 'middle')
          .text(blip.number())
          // .append("svg:title")
          // .text(blip.name() + ((toolTipDescription && blip.description())
          //     ? ': ' + blip.description().replace(/(<([^>]+)>)/ig, '')
          //     : '' ))
      });
    });
  };

  function plotQuadrantNames(quadrants) {
    function plotName(name, anchor, x, y, cssClass) {
      svg.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('class', cssClass)
        .attr('text-anchor', anchor)
        .text(name);
    }

    plotName(quadrants.I.name(), 'end', size - 10, 10, 'first')
    plotName(quadrants.II.name(), 'start', 10, 10, 'second')
    plotName(quadrants.III.name(), 'start', 10, size - 10, 'third')
    plotName(quadrants.IV.name(), 'end', size -10, size - 10, 'fourth')
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
      plotBlips(cycles, quadrants.I, 1, -1, 'first');
      plotBlips(cycles, quadrants.II, -1, -1, 'second');
      plotBlips(cycles, quadrants.III, -1, 1, 'third');
      plotBlips(cycles, quadrants.IV, 1, 1, 'fourth');
    }

    texts.forEach(function (fn) {
      fn();
    });
  };

  return self;
};
