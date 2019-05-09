const MalformedDataError = require('../exceptions/malformedDataError')
const ExceptionMessages = require('../util/exceptionMessages')
const { getConfig } = require('../util/normalizedConfig')
const Ring = require('../models/ring')

const Radar = function () {
  var self, quadrants, blipNumber, addingQuadrant, alternatives, currentSheetName

  blipNumber = 0
  addingQuadrant = 0
  quadrants = [
    { order: 'first', startAngle: 90 },
    { order: 'second', startAngle: 0 },
    { order: 'third', startAngle: -90 },
    { order: 'fourth', startAngle: -180 }
  ]
  alternatives = []
  currentSheetName = ''
  self = {}

  function setNumbers (blips) {
    blips.forEach(function (blip) {
      blip.setNumber(++blipNumber)
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

  self.rings = function () {
    if (addingQuadrant !== 4) throw new MalformedDataError(ExceptionMessages.LESS_THAN_FOUR_QUADRANTS)
    return (getConfig()).rings.map(function (el, i) { return new Ring(el, i) })
  }

  self.quadrants = function () {
    return quadrants
  }

  return self
}

module.exports = Radar
