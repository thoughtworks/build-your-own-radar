const MalformedDataError = require('../exceptions/malformedDataError')
const ExceptionMessages = require('../util/exceptionMessages')

const _ = {
  map: require('lodash/map'),
  uniqBy: require('lodash/uniqBy'),
  sortBy: require('lodash/sortBy'),
}

const Radar = function () {
  const config = require('../config')
  const featureToggles = config().featureToggles

  let self, quadrants, blipNumber, addingQuadrant, alternatives, currentSheetName, rings

  blipNumber = 0
  addingQuadrant = 0
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
      ]
  alternatives = []
  currentSheetName = ''
  self = {}
  rings = {}

  function setNumbers(blips) {
    blips.forEach(function (blip) {
      ++blipNumber
      blip.setBlipText(blipNumber)
      blip.setId(blipNumber)
    })
  }

  self.addAlternative = function (sheetName) {
    alternatives.push(sheetName)
  }

  self.getAlternatives = function () {
    return alternatives
  }

  self.setCurrentSheet = function (sheetName) {
    currentSheetName = sheetName
  }

  self.getCurrentSheet = function () {
    return currentSheetName
  }

  self.addQuadrant = function (quadrant) {
    if (addingQuadrant >= 4) {
      throw new MalformedDataError(ExceptionMessages.TOO_MANY_QUADRANTS)
    }
    quadrants[addingQuadrant].quadrant = quadrant
    setNumbers(quadrant.blips())
    addingQuadrant++
  }
  self.addRings = function (allRings) {
    rings = allRings
  }

  function allQuadrants() {
    if (addingQuadrant < 4) {
      throw new MalformedDataError(ExceptionMessages.LESS_THAN_FOUR_QUADRANTS)
    }

    return _.map(quadrants, 'quadrant')
  }

  function allBlips() {
    return allQuadrants().reduce(function (blips, quadrant) {
      return blips.concat(quadrant.blips())
    }, [])
  }

  self.rings = function () {
    if (featureToggles.UIRefresh2022) {
      return rings
    }

    return _.sortBy(
      _.map(
        _.uniqBy(allBlips(), function (blip) {
          return blip.ring().name()
        }),
        function (blip) {
          return blip.ring()
        },
      ),
      function (ring) {
        return ring.order()
      },
    )
  }

  self.quadrants = function () {
    return quadrants
  }

  return self
}

module.exports = Radar
