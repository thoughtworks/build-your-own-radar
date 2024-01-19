const RingCalculator = require('../../src/util/ringCalculator')

describe('ringCalculator', function () {
  var ringLength, radarSize, ringCalculator
  beforeAll(function () {
    ringLength = 4
    radarSize = 500
    ringCalculator = new RingCalculator(ringLength, radarSize)
  })

  it('sums up the sequences', function () {
    expect(ringCalculator.sum(ringLength)).toEqual(16)
  })

  it('calculates the correct radius', function () {
    expect(ringCalculator.getRadius(ringLength)).toEqual(radarSize)
  })

  it('calculates the ring radius', function () {
    expect(ringCalculator.getRingRadius(1)).toEqual(158)
  })

  it('calculates the ring radius for invalid ring as 0', function () {
    expect(ringCalculator.getRingRadius(10)).toEqual(0)
  })
})
