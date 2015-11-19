tr.factory.GoogleSheet = function (sheetId) {
  var self = {};

  self.build = function () {
    Tabletop.init( { key: sheetId,
                     callback: createRadar,
                     simpleSheet: true } )

    function createRadar(blips, tabletop) {
      document.title = tabletop.googleSheetName;
      d3.selectAll(".loading").remove();

      var cycles = _.pluck(_.uniq(blips, 'cycle'), 'cycle');
      var cycleMap = {};
      _.each(cycles, function (cycleName, i) {
        cycleMap[cycleName] = new tr.models.Cycle(cycleName, i);
      });

      var quadrants = {};
      _.each(blips, function (blip) {
        if (!quadrants[blip.quadrant]) {
          quadrants[blip.quadrant] = new tr.models.Quadrant(_.capitalize(blip.quadrant));
        }
        quadrants[blip.quadrant].add(new tr.models.Blip(blip.Name, cycleMap[blip.cycle], blip.isNew.toLowerCase() === 'true', blip.topic, blip.description))
      });

      var radar = new tr.models.Radar();
      _.each(quadrants, function (quadrant) {
        radar.addQuadrant(quadrant)
      });

      var size = (window.innerHeight - 133) < 620 ? 620 : window.innerHeight - 133;
      new tr.graphing.Radar(size, radar).init().plot();
    }
  };

  self.init = function () {
    d3.select('body')
      .append('div')
      .attr('class', 'loading')
      .text('Loading your data...');

    return self;
  }

  return self;
};

tr.factory.GoogleSheetInput = function () {
  var self = {};

  self.build = function () {
    var match;
    if (match = window.location.search.match(/\?sheetId=(.*)/)) {
      return tr.factory.GoogleSheet(match[1]).init().build();
    } else {
      var content = d3.select('body')
        .append('div')
        .attr('class', 'input-sheet');
      content.append('p')
        .html('Automatically generate an interactive radar, inspired by <a href="http://thoughtworks.com/radar/">thoughtworks.com/radar/</a>. The radar data is provided by your public google sheet, and must conform to <a href="https://github.com/thenano/tech-radar#setting-up-your-data">this format</a>.')

      var form = content.append('form')
        .attr('method', 'get');

      form.append('label').text('Please provide the id of your public google sheet:');

      form.append('input')
        .attr('type', 'text')
        .attr('name', 'sheetId');

      form.append('p').attr('class', 'small').html("Don't know what to do here? Have a look at the <a href='https://github.com/thenano/tech-radar'>documentation</a>");
    }
  }

  return self;
};