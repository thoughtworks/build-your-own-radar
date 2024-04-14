const RingCalculator = function (numberOfRings, maxRadius) {
  var sequence = [0, 6, 5, 3, 2, 1, 1, 1]

  var self = {}

  self.sum = function (length) {
    return sequence.slice(0, length + 1).reduce(function (previous, current) {
      return previous + current
    }, 0)
  }

  self.getRadius = function (ring) {
    var total = self.sum(numberOfRings)
    var sum = self.sum(ring)

    return (maxRadius * sum) / total
  }

  self.getRingRadius = function (ringIndex) {
    const ratios = [0, 0.316, 0.652, 0.832, 1]
    const radius = ratios[ringIndex] * maxRadius
    return radius || 0
  }

  return self
}

module.exports = RingCalculator
