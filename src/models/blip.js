const IDEAL_BLIP_WIDTH = 22
const BLIP_WIDTH_LARGEST = 60
const BLIP_WIDTH_SMALLEST = 10
const Blip = function (name, ring, isNew, topic, description, size) {
  var self, number

  self = {}
  number = -1

  if (size){
    self.width = size
    if (size > BLIP_WIDTH_LARGEST){
      self.width = BLIP_WIDTH_LARGEST
    }
    if (size < BLIP_WIDTH_SMALLEST){
      self.width = BLIP_WIDTH_SMALLEST
    }

  }else
  {  self.width = IDEAL_BLIP_WIDTH}


  self.size = function () {
    console.log (size)
    return size
  }

  self.name = function () {
    return name
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

  self.ring = function () {
    return ring
  }

  self.number = function () {
    number = size
    return number
  }

  self.setNumber = function (newNumber) {
    number = newNumber
  }

  return self
}

module.exports = Blip
