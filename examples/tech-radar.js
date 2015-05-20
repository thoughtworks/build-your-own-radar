/**
 * tech-radar
 * @version v0.1.6
 */
var tr = tr || {};
tr.models = {};
tr.graphing = {};
tr.util = {};

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
    var tsize, top, left, right, bottom, points;

    tsize = 13
    top = y - tsize;
    left = (x - tsize + 1);
    right = (x + tsize + 1);
    bottom = (y + tsize - tsize / 2.5);

    points = x + 1 + ',' + top + ' ' + left + ',' + bottom + ' ' + right + ',' + bottom;

    return svg.append('polygon')
      .attr('points', points)
      .attr('class', cssClass)
      .attr('stroke-width', 1.5);
  }

  function circle(x, y, cssClass) {
    svg.append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('class', cssClass)
      .attr('stroke-width', 1.5)
      .attr('r', 10);
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
        chance = new Chance(sum * cycle.name().length * blip.number());

        angleInRad = Math.PI * chance.integer({ min: 13, max: 85 }) / 180;
        radius = chance.floating({ min: minRadius + 25, max: maxRadius - 10 });

        var x = center() + radius * Math.cos(angleInRad) * adjustX;
        var y = center() + radius * Math.sin(angleInRad) * adjustY;

        if (blip.isNew()) {
          triangle(x, y, cssClass);
        } else {
          circle(x, y, cssClass);
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
  };

  return self;
};

tr.graphing.RefTable = function (radar) {
  var self = {};
  var injectionElement;

  function blipsByCycle () {
    // set up empty blip arrays for each cycle
    var cycles = {};
    radar.cycles()
      .map(function (cycle) {
        return {
          order: cycle.order(),
          name: cycle.name()
        };
      })
      .sort(function (a, b) {
        if (a.order === b.order) {
          return 0;
        } else if (a.order < b.order) {
          return -1;
        } else {
          return 1;
        }
      })
      .forEach(function (cycle) {
        cycles[cycle.name] = [];
      });

    // group blips by cycle
    var blips = [];
    var quadrants = radar.quadrants();
    Object.keys(quadrants).forEach(function (quadrant) {
        blips = blips.concat(quadrants[quadrant].blips());
    });

    blips.forEach(function (blip) {
      cycles[blip.cycle().name()].push(blip);
    });

    return cycles;
  }

  self.init = function (selector) {
    injectionElement = document.querySelector(selector || 'body');
    return self;
  };

  self.render = function () {
    var blips = blipsByCycle();

    var html = '<table class="radar-ref-table">';

    Object.keys(blips).forEach(function (cycle) {
        html += '<tr class="radar-ref-status-group"><td colspan="3">' + cycle + '</td></tr>';

        blips[cycle].forEach(function (blip) {
          html += '<tr>' +
                    '<td>' + blip.number() + '</td>' +
                    '<td>' + blip.name() + '</td>' +
                    '<td>' + blip.description() + '</td>' +
                  '</tr>';
        });
    });

    html += '</table>';

    injectionElement.innerHTML = html;
  };

  return self;
};

tr.models.Blip = function (name, cycle, isNew, description) {
  var self, number;

  self = {};
  number = -1;

  self.name = function () {
    return name;
  };

  self.description = function () {
    return description || '';
  };

  self.isNew = function () {
    return isNew;
  };

  self.cycle = function () {
    return cycle;
  };

  self.number = function () {
    return number;
  };

  self.setNumber = function (newNumber) {
    number = newNumber;
  };

  return self;
};

tr.models.Cycle = function (name, order) {
  var self = {};

  self.name = function () {
    return name;
  };

  self.order = function () {
    return order;
  };

  return self;
};

tr.models.Quadrant = function (name) {
  var self, blips;

  self = {};
  blips = [];

  self.name = function () {
    return name;
  };

  self.add = function (newBlips) {
    if (Array.isArray(newBlips)) {
      blips = blips.concat(newBlips);
    } else {
      blips.push(newBlips);
    }
  };

  self.blips = function () {
    return blips.slice(0);
  };

  return self;
};

tr.models.Radar = function() {
  var self, quadrants, blipNumber;

  blipNumber = 0;
  quadrants = { I: null, II: null, III: null, IV: null };
  self = {};

  function setNumbers(blips) {
    blips.forEach(function (blip) {
      blip.setNumber(++blipNumber);
    });
  }

  self.setFirstQuadrant = function (quadrant) {
    quadrants.I = quadrant;
    setNumbers(quadrants.I.blips());
  };

  self.setSecondQuadrant = function (quadrant) {
    quadrants.II = quadrant;
    setNumbers(quadrants.II.blips());
  };

  self.setThirdQuadrant = function (quadrant) {
    quadrants.III = quadrant;
    setNumbers(quadrants.III.blips());
  };

  self.setFourthQuadrant = function (quadrant) {
    quadrants.IV = quadrant;
    setNumbers(quadrants.IV.blips());
  };

  function allQuadrants() {
    var all = [];

    for (var p in quadrants) {
      if (quadrants.hasOwnProperty(p) && quadrants[p] != null) {
        all.push(quadrants[p]);
      }
    }

    return all;
  }

  function allBlips() {
    return allQuadrants().reduce(function (blips, quadrant) {
      return blips.concat(quadrant.blips());
    }, []);
  }

  self.hasQuadrants = function () {
    return !!quadrants.I || !!quadrants.II || !!quadrants.III || !!quadrants.IV;
  }

  self.cycles = function () {
    var cycleHash, cycleArray;

    cycleArray = [];
    cycleHash = {};

    allBlips().forEach(function (blip) {
      cycleHash[blip.cycle().name()] = blip.cycle();
    });

    for (var p in cycleHash) {
      if (cycleHash.hasOwnProperty(p)) {
        cycleArray.push(cycleHash[p]);
      }
    }

    return cycleArray.slice(0).sort(function (a, b) { return a.order() - b.order(); });
  };

  self.quadrants = function () {
    return quadrants;
  };

  return self;
};

tr.util.Fib = function () {
  var self = {};

  self.sequence = function (length) {
    var result = [0, 1];

    for (var i = 2; i < length; i++) {
      result[i] = result[i-2] + result[i-1];
    }

    return result;
  };

  self.sum = function (length) {
    if (length === 0) { return 0; }
    if (length === 1) { return 1; }

    return self.sequence(length + 1).reduce(function (previous, current) {
      return previous + current;
    }, 0);
  };

  return self;
};
