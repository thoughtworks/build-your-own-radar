const MalformedDataError = require('../exceptions/malformedDataError')
const ExceptionMessages = require('../util/exceptionMessages')

const Radar = function () {
  let self, quadrants, blipNumber, addingQuadrant, alternatives, currentSheetName, rings

  blipNumber = 0
  addingQuadrant = 0
  quadrants = [
    { order: 'first', startAngle: 0 },
    { order: 'second', startAngle: -90 },
    { order: 'third', startAngle: 90 },
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

  self.rings = function () {
    return rings
  }

  self.quadrants = function () {
    return quadrants
  }

  return self
}

module.exports = Radar
