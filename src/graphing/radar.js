tr.graphing.Radar = function (size, radar) {
  var self, fib, svg, radarElement, blipWidth = 22;
  
  var tip = d3.tip().attr('class','d3-tip').html(function (text) {
    return text;
  });
  tip.direction(function (d) {
    if (d3.select('.quadrant-table.selected').node()) {
      var selectedQuadrant = d3.select('.quadrant-table.selected');
      if (selectedQuadrant.classed('first') || selectedQuadrant.classed('fourth'))
        return 'ne';
      else
        return 'nw';
    }
    return 'n';
  });

  fib = new tr.util.Fib();

  self = {};
  self.svg = function () {
    return svg;
  }

  function center() {
    return Math.round(size/2);
  }

  function toRadian(angleInDegrees) {
    return Math.PI * angleInDegrees / 180;
  }

  function plotLines(quadrantGroup, quadrant) {
    var startX = size * (1 - (-Math.sin(toRadian(quadrant.startAngle)) + 1)/2);
    var endX = size * (1 - (-Math.sin(toRadian(quadrant.startAngle - 90)) + 1)/2);
    
    var startY = size * (1 - (Math.cos(toRadian(quadrant.startAngle)) + 1)/2)
    var endY = size * (1 - (Math.cos(toRadian(quadrant.startAngle - 90)) + 1)/2)

    quadrantGroup.append('line')
      .attr('x1', center()).attr('x2', center())
      .attr('y1', startY).attr('y2', endY)
      .attr('stroke-width', 14);

    quadrantGroup.append('line')
      .attr('x1', startX).attr('y1', center())
      .attr('x2', endX).attr('y2', center())
      .attr('stroke-width', 14);
  };

  function getRadius(cycles, i) {
    var total = fib.sum(cycles.length);
    var sum = fib.sum(i);

    return center() - (center() * sum / total);
  }

  function plotQuadrant(cycles, quadrant) {
    var quadrantGroup = svg.append('g').attr('class', 'quadrant-group quadrant-group-' + quadrant.order)

    cycles.forEach(function (cycle, i) {
      var arc = d3.svg.arc()
        .innerRadius((i == cycles.length - 1) ? 0: getRadius(cycles, i + 1))
        .outerRadius(getRadius(cycles, i))
        .startAngle(toRadian(quadrant.startAngle))
        .endAngle(toRadian(quadrant.startAngle - 90));

      quadrantGroup.append('path')
        .attr('d',arc)
        .attr('class', 'cycle-arc-' + cycle.order())
        .attr('transform','translate('+center()+', '+center()+')');
    });

    return quadrantGroup;
  }

  function plotTexts(quadrantGroup, cycles, quadrant) {
    var increment;

    increment = Math.round(center() / cycles.length);

    cycles.forEach(function (cycle, i) {
      if (quadrant.order === 'first' || quadrant.order === 'fourth') {
        quadrantGroup.append('text')
          .attr('class', 'line-text')
          .attr('y', center() + 4)
          .attr('x', center() + getRadius(cycles, i) - blipWidth/2)
          .attr('text-anchor', 'end')
          .text(cycle.name());
      } else {
        quadrantGroup.append('text')
        .attr('class', 'line-text')
        .attr('y', center() + 4)
        .attr('x', center() - getRadius(cycles, i) + blipWidth/2)
        .text(cycle.name());
      }
    });
  };

  function triangle(x, y, order, group) {
    return group.append('path').attr('d',"M412.201,311.406c0.021,0,0.042,0,0.063,0c0.067,0,0.135,0,0.201,0c4.052,0,6.106-0.051,8.168-0.102c2.053-0.051,4.115-0.102,8.176-0.102h0.103c6.976-0.183,10.227-5.306,6.306-11.53c-3.988-6.121-4.97-5.407-8.598-11.224c-1.631-3.008-3.872-4.577-6.179-4.577c-2.276,0-4.613,1.528-6.48,4.699c-3.578,6.077-3.26,6.014-7.306,11.723C402.598,306.067,405.426,311.406,412.201,311.406")
      .attr('transform','scale('+(blipWidth/34)+') translate('+(-404+x*(34/blipWidth)-17)+', '+(-282+y*(34/blipWidth)-17)+')')
      .attr('class', order);
  }

  function circle(x, y, order, group) {
    return (group || svg).append('path')
      .attr('d',"M420.084,282.092c-1.073,0-2.16,0.103-3.243,0.313c-6.912,1.345-13.188,8.587-11.423,16.874c1.732,8.141,8.632,13.711,17.806,13.711c0.025,0,0.052,0,0.074-0.003c0.551-0.025,1.395-0.011,2.225-0.109c4.404-0.534,8.148-2.218,10.069-6.487c1.747-3.886,2.114-7.993,0.913-12.118C434.379,286.944,427.494,282.092,420.084,282.092")
      .attr('transform','scale('+(blipWidth/34)+') translate('+(-404+x*(34/blipWidth)-17)+', '+(-282+y*(34/blipWidth)-17)+')')
      .attr('class', order);
  }

  function addCycle(cycle, order) {
    var table = d3.select('.quadrant-table.' + order);
    table.append('h3').text(cycle)
    return table.append('ul');
  }

  function calculateBlipCoordinates(chance, blip, minRadius, maxRadius, startAngle) {
    var adjustX = Math.sin(toRadian(startAngle)) - Math.cos(toRadian(startAngle)) ;
    var adjustY = -Math.cos(toRadian(startAngle)) - Math.sin(toRadian(startAngle));

    var angle = toRadian(chance.integer({ min: 13, max: 85 }));
    var radius = chance.floating({ min: minRadius + 10, max: maxRadius - 10 });

    var x = center() + radius * Math.cos(angle) * adjustX;
    var y = center() + radius * Math.sin(angle) * adjustY;

    return [x, y];
  }

  function thereIsCollision(coordinates, allCoordinates) {
    return allCoordinates.some(function (currentCoordinates) {
      return (Math.abs(currentCoordinates[0] - coordinates[0]) < blipWidth) && (Math.abs(currentCoordinates[1] - coordinates[1]) < blipWidth)
    });
  }

  function plotBlips(quadrantGroup, cycles, quadrantWrapper) {
    var blips, quadrant, startAngle, order;

    quadrant = quadrantWrapper.quadrant;
    startAngle = quadrantWrapper.startAngle;
    order = quadrantWrapper.order;

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

      var cycleList = addCycle(cycle.name(), order);
      var allBlipCoordinatesInCycle = [];

      cycleBlips.forEach(function (blip) {
        var coordinates = calculateBlipCoordinates(chance, blip, minRadius, maxRadius, startAngle);
        while (thereIsCollision(coordinates, allBlipCoordinatesInCycle)) {
          coordinates = calculateBlipCoordinates(chance, blip, minRadius, maxRadius, startAngle);
        }
        allBlipCoordinatesInCycle.push(coordinates);
        var x = coordinates[0];
        var y = coordinates[1];

        var group = quadrantGroup.append('g').attr('class', 'blip-link');

        if (blip.isNew()) {
          triangle(x, y, order, group);
        } else {
          circle(x, y, order, group);
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
        if (blip.description()) {
          blipItemDescription.append('p').text(blip.description());
        }

        var mouseOver = function () {
          d3.selectAll('g.blip-link').attr('opacity',0.3);
          group.attr('opacity',1.0);
          blipListItem.selectAll('.blip-list-item').classed('highlight', true);
          tip.show(blip.name(), group.node());
        }

        var mouseOut = function () {
          d3.selectAll('g.blip-link').attr('opacity',1.0);
          blipListItem.selectAll('.blip-list-item').classed('highlight', false);
          tip.hide().style({left: 0, top: 0});
        }

        blipListItem.on('mouseover', mouseOver).on('mouseout', mouseOut);
        group.on('mouseover', mouseOver).on('mouseout', mouseOut);

        var clickBlip = function () {
          blipItemDescription.classed("expanded", !blipItemDescription.classed("expanded"));
        };

        blipListItem.on('click', clickBlip);
      });
    });
  };

  function plotQuadrantButtons(quadrants) {
    var header = radarElement.append('header');

    function addButton(quadrant) {
      var order = quadrant.order;
      var startAngle = quadrant.startAngle;

      radarElement.append('div')
        .attr('class', 'quadrant-table ' + order);

      var button = header.append('div')
        .attr('class', 'button ' + order)
        .text(quadrant.quadrant.name())
        .on('mouseover', function () {
          d3.select('.quadrant-group-' + order).style('opacity', 1);
          d3.selectAll('.quadrant-group:not(.quadrant-group-' + order + ')').style('opacity', 0.3);
        })
        .on('mouseout', function () {
          d3.selectAll('.quadrant-group:not(.quadrant-group-' + order + ')').style('opacity', 1);
        })
        .on('click', function () {
          d3.selectAll('.button').classed('selected', false);
          button.classed('selected', true);
          d3.selectAll('.quadrant-table').classed('selected', false);
          d3.selectAll('.quadrant-table.' + order).classed('selected', true);

          var adjustX = Math.sin(toRadian(startAngle)) - Math.cos(toRadian(startAngle));
          var adjustY = Math.cos(toRadian(startAngle)) + Math.sin(toRadian(startAngle));

          var translateX = (-1 - adjustX) * size/2
          var translateY = (-1 + adjustY) * (size/2 - 7);

          var translateXAll = (1 - adjustX) * size/2
          var translateYAll = (1 + adjustY) * size/2;
          
          var moveRight = (1 + adjustX) * (window.innerWidth - size)/2
          var moveLeft = (1 - adjustX) * (window.innerWidth - size)/2;

          svg.style({left: moveLeft, right: moveRight});
          d3.select('.quadrant-group-' + order)
            .transition()
            .duration(1000)
            .attr('transform', 'translate('+ translateX + ',' + translateY + ')scale(2)');
          d3.selectAll('.quadrant-group:not(.quadrant-group-' + order + ')')
            .transition()
            .duration(1000)
            .attr('transform', 'translate('+ translateXAll + ',' + translateYAll + ')scale(0)');
        });
    }

    _.each([0, 3, 2, 1], function (i) {
      addButton(quadrants[i]);  
    });
  }

  self.init = function () {
    radarElement = d3.select('body').append('div').attr('id', 'radar');
    return self;
  };

  self.plot = function () {
    var cycles, quadrants;

    cycles = radar.cycles().reverse();
    quadrants = radar.quadrants();

    plotQuadrantButtons(quadrants);
    
    svg = radarElement.append("svg").call(tip);
    svg.attr('width', size).attr('height', size + 14);
    
    _.each(quadrants, function (quadrant) {
      var quadrantGroup = plotQuadrant(cycles, quadrant);
      plotLines(quadrantGroup, quadrant);
      plotTexts(quadrantGroup, cycles, quadrant);
      plotBlips(quadrantGroup, cycles, quadrant);
    });
  };

  return self;
};
