describe('tr.models.Radar', function () {

  it('has no quadrants by default', function () {
    radar = new tr.models.Radar();

    expect(radar.quadrants()[0].quadrant).not.toBeDefined();
    expect(radar.quadrants()[1].quadrant).not.toBeDefined();
    expect(radar.quadrants()[2].quadrant).not.toBeDefined();
    expect(radar.quadrants()[3].quadrant).not.toBeDefined();
  });

  it('sets the first quadrant', function () {
    var quadrant, radar, blip;

    blip = new tr.models.Blip('A', new tr.models.Cycle('First'));
    quadrant = new tr.models.Quadrant('First');
    quadrant.add([blip]);
    radar = new tr.models.Radar();

    radar.addQuadrant(quadrant);

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant);
    expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
  });

  it('sets the second quadrant', function () {
    var quadrant, radar, blip;

    blip = new tr.models.Blip('A', new tr.models.Cycle('First'));
    quadrant = new tr.models.Quadrant('Second');
    quadrant.add([blip]);
    radar = new tr.models.Radar();

    radar.addQuadrant(quadrant);

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant);
    expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
  });

  it('sets the third quadrant', function () {
    var quadrant, radar, blip;

    blip = new tr.models.Blip('A', new tr.models.Cycle('First'));
    quadrant = new tr.models.Quadrant('Third');
    quadrant.add([blip]);
    radar = new tr.models.Radar();

    radar.addQuadrant(quadrant);

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant);
    expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
  });

  it('sets the fourth quadrant', function () {
    var quadrant, radar, blip;

    blip = new tr.models.Blip('A', new tr.models.Cycle('First'));
    quadrant = new tr.models.Quadrant('Fourth');
    quadrant.add([blip]);
    radar = new tr.models.Radar();

    radar.addQuadrant(quadrant);

    expect(radar.quadrants()[0].quadrant).toEqual(quadrant);
    expect(radar.quadrants()[0].quadrant.blips()[0].number()).toEqual(1);
  });

  describe('blip numbers', function () {
    var firstQuadrant, secondQuadrant, radar, firstCycle;

    beforeEach(function () {
      firstCycle = new tr.models.Cycle('Adopt', 0);
      firstQuadrant = new tr.models.Quadrant('First');
      secondQuadrant = new tr.models.Quadrant('Second');
      firstQuadrant.add([
        new tr.models.Blip('A', firstCycle),
        new tr.models.Blip('B', firstCycle)
      ]);
      secondQuadrant.add([
        new tr.models.Blip('C', firstCycle),
        new tr.models.Blip('D', firstCycle)
      ]);
      radar = new tr.models.Radar();
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
      firstCycle = new tr.models.Cycle('Adopt', 0);
      secondCycle = new tr.models.Cycle('Hold', 1);
      quadrant = new tr.models.Quadrant('Fourth');
      otherQuadrant = new tr.models.Quadrant('Other');
      radar = new tr.models.Radar();
    });

    it('returns an array for a given set of blips', function () {
      quadrant.add([
        new tr.models.Blip('A', firstCycle),
        new tr.models.Blip('B', secondCycle)
      ]);

      radar.addQuadrant(quadrant);
      radar.addQuadrant(otherQuadrant);
      radar.addQuadrant(otherQuadrant);
      radar.addQuadrant(otherQuadrant);

      expect(radar.cycles()).toEqual([firstCycle, secondCycle]);
    });

    it('has unique cycles', function () {
      quadrant.add([
        new tr.models.Blip('A', firstCycle),
        new tr.models.Blip('B', firstCycle),
        new tr.models.Blip('C', secondCycle)
      ]);

        radar.addQuadrant(quadrant);
        radar.addQuadrant(otherQuadrant);
        radar.addQuadrant(otherQuadrant);
        radar.addQuadrant(otherQuadrant);

        expect(radar.cycles()).toEqual([firstCycle, secondCycle]);
    });

    it('has sorts by the cycle order', function () {
      quadrant.add([
        new tr.models.Blip('C', secondCycle),
        new tr.models.Blip('A', firstCycle),
        new tr.models.Blip('B', firstCycle)
      ]);

      radar.addQuadrant(quadrant);
      radar.addQuadrant(otherQuadrant);
      radar.addQuadrant(otherQuadrant);
      radar.addQuadrant(otherQuadrant);

      expect(radar.cycles()).toEqual([firstCycle, secondCycle]);
    });
  });
});
