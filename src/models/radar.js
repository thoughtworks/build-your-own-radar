const MalformedDataError = require('../exceptions/malformedDataError');
const ExceptionMessages = require('../util/exceptionMessages');

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
    if(addingQuadrant >= 4) {
      throw new MalformedDataError(ExceptionMessages.TOO_MANY_QUADRANTS);
    }
    quadrants[addingQuadrant].quadrant = quadrant;
    setNumbers(quadrant.blips());
    addingQuadrant++;
  };

   function allQuadrants() {
    if (addingQuadrant < 4)
      throw new MalformedDataError(ExceptionMessages.LESS_THAN_FOUR_QUADRANTS);

    return _.map(quadrants, 'quadrant');
  }

  function allBlips() {
    return allQuadrants().reduce(function (blips, quadrant) {
      return blips.concat(quadrant.blips());
    }, []);
  }

  self.rings = function () {
    return _.sortBy(_.map(_.uniqBy(allBlips(), function (blip) {
      return blip.ring().name();
    }), function (blip) {
      return blip.ring();
    }), function (ring) {
      return ring.order();
    });
  };

  self.quadrants = function () {
    return quadrants;
  };

  return self;
};

module.exports = Radar;
