tr.models.Radar = function() {
  var self, quadrants;

  quadrants = { I: null, II: null, III: null, IV: null };
  self = {};

  self.setFirstQuadrant = function (quadrant) {
    quadrants.I = quadrant;
  };

  self.setSecondQuadrant = function (quadrant) {
    quadrants.II = quadrant;
  };

  self.setThirdQuadrant = function (quadrant) {
    quadrants.III = quadrant;
  };

  self.setFourthQuadrant = function (quadrant) {
    quadrants.IV = quadrant;
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

    return cycleArray.slice(0);
  };

  self.quadrants = function () {
    return quadrants;
  };

  return self;
};
