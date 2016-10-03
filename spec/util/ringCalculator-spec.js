const RingCalculator = require('../../src/util/ringCalculator');

describe('ringCalculator', function(){
    var cycleLength, radarSize, ringCalculator;
    beforeAll(function(){
        cycleLength = 4;
        radarSize = 500;
        ringCalculator = new RingCalculator(cycleLength, radarSize);

    });

    it('sums up the sequences', function(){
        expect(ringCalculator.sum(cycleLength)).toEqual(16);
    });

    it('calculates the correct radius', function(){
        expect(ringCalculator.getRadius(cycleLength)).toEqual(radarSize);
    });

});