tr.graphing.Radar = function (size, radar, toolTipDescription) {
  var self, fib, svg, texts;
  
  var tip = d3.tip().attr('class','d3-tip').html(function (text) {
    return text;
  });

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
    var total = fib.sum(cycles.length);
    var sum = fib.sum(i);

    return center() - (center() * sum / total);
  }

  function plotCircles(cycles) {
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
    var w = 22;
    return (group || svg).append('path')
      .attr('d',"M420.084,282.092c-1.073,0-2.16,0.103-3.243,0.313c-6.912,1.345-13.188,8.587-11.423,16.874c1.732,8.141,8.632,13.711,17.806,13.711c0.025,0,0.052,0,0.074-0.003c0.551-0.025,1.395-0.011,2.225-0.109c4.404-0.534,8.148-2.218,10.069-6.487c1.747-3.886,2.114-7.993,0.913-12.118C434.379,286.944,427.494,282.092,420.084,282.092")
      .attr('transform','scale('+(w/34)+') translate('+(-404+x*(34/w)-17)+', '+(-282+y*(34/w)-17)+')')
      .attr('class', cssClass);
  }

  function addCycle(cycle, quadrant) {
    var table = d3.select('#' + quadrant + '-quadrant').append('div').attr('class', 'cycle-table');
    table.append('h3').text(cycle)
    return table.append('ul');
  }

  function calculateBlipCoordinates(chance, blip, minRadius, maxRadius, adjustX, adjustY) {
    var angleInRad = Math.PI * chance.integer({ min: 13, max: 85 }) / 180;
    var radius = chance.floating({ min: minRadius + 25, max: maxRadius - 10 });

    var x = center() + radius * Math.cos(angleInRad) * adjustX;
    var y = center() + radius * Math.sin(angleInRad) * adjustY;

    return [x, y];
  }

  function thereIsCollision(coordinates, allCoordinates) {
    var radius = 22;
    return allCoordinates.some(function (currentCoordinates) {
      return (Math.abs(currentCoordinates[0] - coordinates[0]) < radius) && (Math.abs(currentCoordinates[1] - coordinates[1]) < radius)
    });
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

      var sumCycle = cycle.name().split('').reduce(function (p, c) { return p + c.charCodeAt(0); }, 0);
      var sumQuadrant = quadrant.name().split('').reduce(function (p, c) { return p + c.charCodeAt(0); }, 0);
      var chance = new Chance(Math.PI * sumCycle * cycle.name().length * sumQuadrant * quadrant.name().length);

      var cycleList = addCycle(cycle.name(), quadrant.name());
      var allBlipCoordinatesInCycle = [];

      cycleBlips.forEach(function (blip) {
        var coordinates = calculateBlipCoordinates(chance, blip, minRadius, maxRadius, adjustX, adjustY);
        while (thereIsCollision(coordinates, allBlipCoordinatesInCycle)) {
          coordinates = calculateBlipCoordinates(chance, blip, minRadius, maxRadius, adjustX, adjustY);
        }
        allBlipCoordinatesInCycle.push(coordinates);
        var x = coordinates[0];
        var y = coordinates[1];

        var group = svg.append('g').attr('class', 'blip-link');

        if (blip.isNew()) {
          triangle(x, y, cssClass, group);
        } else {
          circle(x, y, cssClass, group);
        }

        group.append('text')
          .attr('x', x)
          .attr('y', y + 4)
          .attr('class', 'blip-text')
          .attr('text-anchor', 'middle')
          .text(blip.number());

        var blipListItem = cycleList.append('li');
        blipListItem.append('div')
          .attr('class', 'blip-list-item')
          .text(blip.number() + '. ' + blip.name() + ". - " + blip.topic());
          
        var blipItemDescription = blipListItem.append('div')
          .attr('class', 'blip-item-description')
          .text(blip.description());

        var mouseOver = function () {
          d3.selectAll('path').attr('opacity',0.3);
          group.selectAll('path').attr('opacity',1.0);
          blipListItem.selectAll('.blip-list-item').classed('highlight', true);
          tip.show(blip.name(), group.node());
        }

        var mouseOut = function () {
          d3.selectAll('path').attr('opacity',1.0);
          blipListItem.selectAll('.blip-list-item').classed('highlight', false);
          tip.hide().style({left: 0, top: 0});
        }

        blipListItem.on('mouseover', mouseOver).on('mouseout', mouseOut);
        group.on('mouseover', mouseOver).on('mouseout', mouseOut);

        var clickBlip = function () {
          blipItemDescription.classed("expanded", !blipItemDescription.classed("expanded"));
        };

        group.on('click', clickBlip);
        blipListItem.on('click', clickBlip);
      });
    });
  };

  function plotQuadrantNames(quadrants) {
    function plotName(name, quadrant) {
      d3.select('#radar').append('div')
        .attr({id: name + '-quadrant', class: 'quadrant-table ' + quadrant})
        .append('h1').attr('class', 'quadrant-name').text(name);
    }

    plotName(quadrants.I.name(), 'first');
    plotName(quadrants.II.name(), 'second');
    plotName(quadrants.III.name(), 'third');
    plotName(quadrants.IV.name(), 'fourth');
  }

  self.init = function (selector) {
    svg = d3.select(selector || 'body').append("svg").call(tip);
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
