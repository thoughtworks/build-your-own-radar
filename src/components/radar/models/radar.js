// // const MalformedDataError = require('../exceptions/malformedDataError');
const ExceptionMessages = require('../util/exceptionMessages');

const _ = {
  map: require('lodash/map'),
  uniqBy: require('lodash/uniqBy'),
  sortBy: require('lodash/sortBy'),
  each: require('lodash/each')
};

const Radar = function({arcs}) {
  var self, quadrants, blipNumber, addingQuadrant;

  blipNumber = 0;
  addingQuadrant = 0;
  quadrants = [];
  for (let index = 0; index < Object.keys(arcs).length; index++) {
    quadrants.push({
      order : 'pie-'+index
    });
  }

  self = {};

  function setNumbers(blips) {
    blips.forEach(function (blip) {
      blip.setNumber(++blipNumber);
    });
  }

  self.addQuadrant = function (quadrant) {
    // if(addingQuadrant >= 4) {
      // throw new MalformedDataError(ExceptionMessages.TOO_MANY_QUADRANTS);
    // }
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


  var idx = 0;
  _.each(arcs, function (arc) {
    quadrants[idx] = quadrants[idx] || quadrants[idx%4];
    self.addQuadrant(arc);
    var blipsPerArc = arc.blips().length;
    quadrants[idx].blipsPerArc = blipsPerArc;
    idx++;
  });
  
  //angles
  var sAngle = 90;
  _.each(quadrants, function (quadrant, idx) {
    quadrant.angle = - 360 * quadrant.blipsPerArc / blipNumber;
    quadrant.startAngle = sAngle;
    sAngle += quadrant.angle;
  });


  function setNumbers(blips) {
    blips.forEach(function (blip) {
      blip.setNumber(++blipNumber);
    });
  }


  return self;
};

module.exports = Radar;
