const RingCalculator = require('../../src/util/ringCalculator');

describe('ringCalculator', () => {
  var ringLength, radarSize, ringCalculator;
  beforeAll(() => {
    ringLength = 4;
    radarSize = 500;
    ringCalculator = new RingCalculator(ringLength, radarSize);
  });

  it('sums up the sequences', () => {
    expect(ringCalculator.sum(ringLength)).toEqual(16);
  });

  it('calculates the correct radius', () => {
    expect(ringCalculator.getRadius(ringLength)).toEqual(radarSize);
  });

  it('calculates the ring radius', () => {
    expect(ringCalculator.getRingRadius(1)).toEqual(158);
  });

  it('calculates the ring radius for invalid ring as 0', () => {
    expect(ringCalculator.getRingRadius(10)).toEqual(0);
  });
});
