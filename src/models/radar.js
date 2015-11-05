tr.models.Radar = function() {
  var self, quadrants, blipNumber, addingQuadrant;

  blipNumber = 0;
  addingQuadrant = 0;
  quadrants = [
    {order: 'first', x: 1, y: -1},
    {order: 'second', x: -1, y: -1},
    {order: 'third', x: -1, y: 1},
    {order: 'fourth', x: 1, y: 1}
  ];
  self = {};

  function setNumbers(blips) {
    blips.forEach(function (blip) {
      blip.setNumber(++blipNumber);
    });
  }

  self.addQuadrant = function (quadrant) {
    quadrants[addingQuadrant].quadrant = quadrant;
    setNumbers(quadrant.blips());
    addingQuadrant++;
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
    return _.pluck(quadrants, 'quadrant');
  }

  function allBlips() {
    return allQuadrants().reduce(function (blips, quadrant) {
      return blips.concat(quadrant.blips());
    }, []);
  }

  self.hasQuadrants = function () {
    return !_.isEmpty(quadrants);
  }

  self.cycles = function () {
    return _.sortBy(_.map(_.uniq(allBlips(), function (blip) {
      return blip.cycle().name();
    }), function (blip) {
      return blip.cycle();
    }), function (cycle) {
      return cycle.order();
    });
  };

  self.quadrants = function () {
    return quadrants;
  };

  return self;
};
