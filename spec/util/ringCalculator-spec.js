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
})
