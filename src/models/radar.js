const MalformedDataError = require('../exceptions/malformedDataError');
const ExceptionMessages = require('../util/exceptionMessages');

const _ = {
  map: require('lodash/map'),
  uniqBy: require('lodash/uniqBy'),
  sortBy: require('lodash/sortBy'),
};

const Radar = () => {
  const config = require('../config');
  const featureToggles = config().featureToggles;

  let self,
    quadrants,
    blipNumber,
    addingQuadrant,
    alternatives,
    currentSheetName,
    rings;

  blipNumber = 0;
  addingQuadrant = 0;
  quadrants = featureToggles.UIRefresh2022
    ? [
        { order: 'first', startAngle: 0 },
        { order: 'second', startAngle: -90 },
        { order: 'third', startAngle: 90 },
        { order: 'fourth', startAngle: -180 },
      ]
    : [
        { order: 'first', startAngle: 90 },
        { order: 'second', startAngle: 0 },
        { order: 'third', startAngle: -90 },
        { order: 'fourth', startAngle: -180 },
      ];
  alternatives = [];
  currentSheetName = '';
  self = {};
  rings = {};

  function setNumbers(blips) {
    blips.forEach((blip) => {
      ++blipNumber;
      blip.setBlipText(blipNumber);
      blip.setId(blipNumber);
    });
  }

  self.addAlternative = (sheetName) => {
    alternatives.push(sheetName);
  };

  self.getAlternatives = () => alternatives;

  self.setCurrentSheet = (sheetName) => {
    currentSheetName = sheetName;
  };

  self.getCurrentSheet = () => currentSheetName;

  self.addQuadrant = (quadrant) => {
    if (addingQuadrant >= 4) {
      throw new MalformedDataError(ExceptionMessages.TOO_MANY_QUADRANTS);
    }
    quadrants[addingQuadrant].quadrant = quadrant;
    setNumbers(quadrant.blips());
    addingQuadrant++;
  };
  self.addRings = (allRings) => {
    rings = allRings;
  };

  function allQuadrants() {
    if (addingQuadrant < 4) {
      throw new MalformedDataError(ExceptionMessages.LESS_THAN_FOUR_QUADRANTS);
    }

    return _.map(quadrants, 'quadrant');
  }

  function allBlips() {
    return allQuadrants().reduce(
      (blips, quadrant) => blips.concat(quadrant.blips()),
      [],
    );
  }

  self.rings = () => {
    if (featureToggles.UIRefresh2022) {
      return rings;
    }

    return _.sortBy(
      _.map(
        _.uniqBy(allBlips(), (blip) => blip.ring().name()),
        (blip) => blip.ring(),
      ),
      (ring) => ring.order(),
    );
  };

  self.quadrants = () => quadrants;

  return self;
};

module.exports = Radar;
