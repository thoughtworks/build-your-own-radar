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
