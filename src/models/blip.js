const IDEAL_BLIP_WIDTH = 15
const BLIP_WIDTH_LARGEST = 80
const BLIP_WIDTH_SMALLEST = IDEAL_BLIP_WIDTH 
const SCALE_FACTOR = 10
const Blip = function (name, ring, isNew, topic, description, size) {
  var self, number

  self = {}
  number = -1

  if (size){
    const scaledSize = size * SCALE_FACTOR + BLIP_WIDTH_SMALLEST
    console.log(scaledSize)
    self.width = scaledSize

    if (scaledSize > BLIP_WIDTH_LARGEST){
      self.width = BLIP_WIDTH_LARGEST
    }
    if (scaledSize < BLIP_WIDTH_SMALLEST){
      self.width = BLIP_WIDTH_SMALLEST
    }

  }else
  {  self.width = IDEAL_BLIP_WIDTH}


  self.size = function () {
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
    return number
  }

  self.setNumber = function (newNumber) {
    number = newNumber
  }

  return self
}

module.exports = Blip
