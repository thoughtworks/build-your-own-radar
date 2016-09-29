const _ = {
  map: require('lodash/map'),
  uniqBy: require('lodash/uniqBy'),
  sortBy: require('lodash/sortBy')
};

const Radar = function() {
  var self, quadrants, blipNumber, addingQuadrant;

  blipNumber = 0;
  addingQuadrant = 0;
  quadrants = [
    {order: 'first', startAngle: 90},
    {order: 'second', startAngle: 0},
    {order: 'third', startAngle: -90},
    {order: 'fourth', startAngle: -180}
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
  };

  function allQuadrants() {
    return _.map(quadrants, 'quadrant');
  }

  function allBlips() {
    return allQuadrants().reduce(function (blips, quadrant) {
      return blips.concat(quadrant.blips());
    }, []);
  }

  self.cycles = function () {
    return _.sortBy(_.map(_.uniqBy(allBlips(), function (blip) {
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

module.exports = Radar;