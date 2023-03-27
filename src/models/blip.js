const { graphConfig } = require('../graphing/config')
const IDEAL_BLIP_WIDTH = 22
const Blip = function (name, ring, isNew, topic, description) {
  var self, number, isGroup

  self = {}
  number = -1
  isGroup = false

  self.width = IDEAL_BLIP_WIDTH

  self.name = function () {
    return name
  }

  self.pillWidth = function () {
    const blipWidth = isNew ? graphConfig.newPillBlipWidth : graphConfig.noChangePillBlipWidth
    return isGroup ? blipWidth : IDEAL_BLIP_WIDTH
  }

  self.topic = function () {
    return topic || ''
  }

  self.description = function () {
    return description || ''
  }

  self.isNew = function () {
    return isNew
  }

  self.isGroup = function () {
    return isGroup
  }

  self.ring = function () {
    return ring
  }

  self.number = function () {
    return number
  }

  self.setNumber = function (newNumber) {
    number = newNumber
  }

  self.setIsGroup = function (value) {
    isGroup = value
  }

  return self
}

module.exports = Blip
