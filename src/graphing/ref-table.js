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
          html += '<tr id="blip-ref-' + blip.number() + '">' +
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
