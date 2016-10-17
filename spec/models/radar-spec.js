const Radar = require('../../src/models/radar');
const Quadrant = require('../../src/models/quadrant');
const Ring = require('../../src/models/ring');
const Blip = require('../../src/models/blip');
const MalformedDataError = require('../../src/exceptions/malformedDataError');
const ExceptionMessages = require('../../src/util/exceptionMessages');

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

    blip = new Blip('A', new Ring('First'));
    quadrant = new Quadrant('First');
    quadrant.add([blip]);
    radar = new Radar();

    radar.addQuadrant(quadrant);

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant);
    expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
  });

  it('sets the second quadrant', function () {
    var quadrant, radar, blip;

    blip = new Blip('A', new Ring('First'));
    quadrant = new Quadrant('Second');
    quadrant.add([blip]);
    radar = new Radar();

    radar.addQuadrant(quadrant);

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant);
    expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
  });

  it('sets the third quadrant', function () {
    var quadrant, radar, blip;

    blip = new Blip('A', new Ring('First'));
    quadrant = new Quadrant('Third');
    quadrant.add([blip]);
    radar = new Radar();

    radar.addQuadrant(quadrant);

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant);
    expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
  });

  it('sets the fourth quadrant', function () {
    var quadrant, radar, blip;

    blip = new Blip('A', new Ring('First'));
    quadrant = new Quadrant('Fourth');
    quadrant.add([blip]);
    radar = new Radar();

    radar.addQuadrant(quadrant);

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant);
    expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
  });

  it('throws an error if too many quadrants are added', function(){
    var quadrant, radar, blip;

    blip = new Blip('A', new Ring('First'));
    quadrant = new Quadrant('First');
    quadrant.add([blip]);
    radar = new Radar();

    radar.addQuadrant(quadrant);
    radar.addQuadrant(new Quadrant('Second'));
    radar.addQuadrant(new Quadrant('Third'));
    radar.addQuadrant(new Quadrant('Fourth'));

    expect(function() { radar.addQuadrant(new Quadrant('Fifth')) }).toThrow(new MalformedDataError(ExceptionMessages.TOO_MANY_QUADRANTS));
  });

  it('throws an error if less than 4 quadrants are added', function(){
    var quadrant, radar, blip;

    blip = new Blip('A', new Ring('First'));
    quadrant = new Quadrant('First');
    quadrant.add([blip]);
    radar = new Radar();

    radar.addQuadrant(quadrant);
    radar.addQuadrant(new Quadrant('Second'));
    radar.addQuadrant(new Quadrant('Third'));

    expect(function() { radar.rings() }).toThrow(new MalformedDataError(ExceptionMessages.LESS_THAN_FOUR_QUADRANTS));
  });

  describe('blip numbers', function () {
    var firstQuadrant, secondQuadrant, radar, firstRing;

    beforeEach(function () {
      firstRing = new Ring('Adopt', 0);
      firstQuadrant = new Quadrant('First');
      secondQuadrant = new Quadrant('Second');
      firstQuadrant.add([
        new Blip('A', firstRing),
        new Blip('B', firstRing)
      ]);
      secondQuadrant.add([
        new Blip('C', firstRing),
        new Blip('D', firstRing)
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

  describe('rings', function () {
    var quadrant, radar, firstRing, secondRing, otherQuadrant;

    beforeEach(function () {
      firstRing = new Ring('Adopt', 0);
      secondRing = new Ring('Hold', 1);
      quadrant = new Quadrant('Fourth');
      otherQuadrant = new Quadrant('Other');
      radar = new Radar();
    });

    it('returns an array for a given set of blips', function () {
      quadrant.add([
        new Blip('A', firstRing),
        new Blip('B', secondRing)
      ]);

      radar.addQuadrant(quadrant);
      radar.addQuadrant(otherQuadrant);
      radar.addQuadrant(otherQuadrant);
      radar.addQuadrant(otherQuadrant);

      expect(radar.rings()).toEqual([firstRing, secondRing]);
    });

    it('has unique rings', function () {
      quadrant.add([
        new Blip('A', firstRing),
        new Blip('B', firstRing),
        new Blip('C', secondRing)
      ]);

        radar.addQuadrant(quadrant);
        radar.addQuadrant(otherQuadrant);
        radar.addQuadrant(otherQuadrant);
        radar.addQuadrant(otherQuadrant);

        expect(radar.rings()).toEqual([firstRing, secondRing]);
    });

    it('has sorts by the ring order', function () {
      quadrant.add([
        new Blip('C', secondRing),
        new Blip('A', firstRing),
        new Blip('B', firstRing)
      ]);

      radar.addQuadrant(quadrant);
      radar.addQuadrant(otherQuadrant);
      radar.addQuadrant(otherQuadrant);
      radar.addQuadrant(otherQuadrant);

      expect(radar.rings()).toEqual([firstRing, secondRing]);
    });
  });
});
