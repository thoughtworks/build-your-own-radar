const Radar = require('../../src/models/radar');
const Quadrant = require('../../src/models/quadrant');
const Cycle = require('../../src/models/cycle');
const Blip = require('../../src/models/blip');

describe('Radar', function () {

  it('has no quadrants by default', function () {
    var radar = new Radar();

    expect(radar.quadrants()[0].quadrant).not.toBeDefined();
    expect(radar.quadrants()[1].quadrant).not.toBeDefined();
    expect(radar.quadrants()[2].quadrant).not.toBeDefined();
    expect(radar.quadrants()[3].quadrant).not.toBeDefined();
  });

  it('sets the first quadrant', function () {
    var quadrant, radar, blip;

    blip = new Blip('A', new Cycle('First'));
    quadrant = new Quadrant('First');
    quadrant.add([blip]);
    radar = new Radar();

    radar.addQuadrant(quadrant);

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant);
    expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
  });

  it('sets the second quadrant', function () {
    var quadrant, radar, blip;

    blip = new Blip('A', new Cycle('First'));
    quadrant = new Quadrant('Second');
    quadrant.add([blip]);
    radar = new Radar();

    radar.addQuadrant(quadrant);

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant);
    expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
  });

  it('sets the third quadrant', function () {
    var quadrant, radar, blip;

    blip = new Blip('A', new Cycle('First'));
    quadrant = new Quadrant('Third');
    quadrant.add([blip]);
    radar = new Radar();

    radar.addQuadrant(quadrant);

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant);
    expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
  });

  it('sets the fourth quadrant', function () {
    var quadrant, radar, blip;

    blip = new Blip('A', new Cycle('First'));
    quadrant = new Quadrant('Fourth');
    quadrant.add([blip]);
    radar = new Radar();

    radar.addQuadrant(quadrant);

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant);
    expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
  });

  describe('blip numbers', function () {
    var firstQuadrant, secondQuadrant, radar, firstCycle;

    beforeEach(function () {
      firstCycle = new Cycle('Adopt', 0);
      firstQuadrant = new Quadrant('First');
      secondQuadrant = new Quadrant('Second');
      firstQuadrant.add([
        new Blip('A', firstCycle),
        new Blip('B', firstCycle)
      ]);
      secondQuadrant.add([
        new Blip('C', firstCycle),
        new Blip('D', firstCycle)
      ]);
      radar = new Radar();
    });

    it('sets blip numbers starting on the first quadrant', function () {
      radar.addQuadrant(firstQuadrant);

      expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
      expect(radar.quadrants()[0].quadrant.blips()[1].number()).toEqual(2);
    });

    it('continues the number from the previous quadrant set', function () {
      radar.addQuadrant(firstQuadrant);
      radar.addQuadrant(secondQuadrant);

      expect(radar.quadrants()[1].quadrant.blips()[0].number()).toEqual(3);
      expect(radar.quadrants()[1].quadrant.blips()[1].number()).toEqual(4);
    });
  });

  describe('cycles', function () {
    var quadrant, radar, firstCycle, secondCycle, otherQuadrant;

    beforeEach(function () {
      firstCycle = new Cycle('Adopt', 0);
      secondCycle = new Cycle('Hold', 1);
      quadrant = new Quadrant('Fourth');
      otherQuadrant = new Quadrant('Other');
      radar = new Radar();
    });

    it('returns an array for a given set of blips', function () {
      quadrant.add([
        new Blip('A', firstCycle),
        new Blip('B', secondCycle)
      ]);

      radar.addQuadrant(quadrant);
      radar.addQuadrant(otherQuadrant);
      radar.addQuadrant(otherQuadrant);
      radar.addQuadrant(otherQuadrant);

      expect(radar.cycles()).toEqual([firstCycle, secondCycle]);
    });

    it('has unique cycles', function () {
      quadrant.add([
        new Blip('A', firstCycle),
        new Blip('B', firstCycle),
        new Blip('C', secondCycle)
      ]);

        radar.addQuadrant(quadrant);
        radar.addQuadrant(otherQuadrant);
        radar.addQuadrant(otherQuadrant);
        radar.addQuadrant(otherQuadrant);

        expect(radar.cycles()).toEqual([firstCycle, secondCycle]);
    });

    it('has sorts by the cycle order', function () {
      quadrant.add([
        new Blip('C', secondCycle),
        new Blip('A', firstCycle),
        new Blip('B', firstCycle)
      ]);

      radar.addQuadrant(quadrant);
      radar.addQuadrant(otherQuadrant);
      radar.addQuadrant(otherQuadrant);
      radar.addQuadrant(otherQuadrant);

      expect(radar.cycles()).toEqual([firstCycle, secondCycle]);
    });
  });
});
