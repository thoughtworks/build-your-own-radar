describe('tr.models.Radar', function () {

  it('has no quadrants by default', function () {
    radar = new tr.models.Radar();

    expect(radar.quadrants().I).toBe(null);
    expect(radar.quadrants().II).toBe(null);
    expect(radar.quadrants().III).toBe(null);
    expect(radar.quadrants().IV).toBe(null);
  });

  it('sets the first quadrant', function () {
    var quadrant, radar;

    quadrant = new tr.models.Quadrant('First');
    radar = new tr.models.Radar();

    radar.setFirstQuadrant(quadrant);

    expect(radar.quadrants().I).toEqual(quadrant);
  });

  it('sets the second quadrant', function () {
    var quadrant, radar;

    quadrant = new tr.models.Quadrant('Second');
    radar = new tr.models.Radar();

    radar.setSecondQuadrant(quadrant);

    expect(radar.quadrants().II).toEqual(quadrant);
  });

  it('sets the third quadrant', function () {
    var quadrant, radar;

    quadrant = new tr.models.Quadrant('Third');
    radar = new tr.models.Radar();

    radar.setThirdQuadrant(quadrant);

    expect(radar.quadrants().III).toEqual(quadrant);
  });

  it('sets the fourth quadrant', function () {
    var quadrant, radar;

    quadrant = new tr.models.Quadrant('Fourth');
    radar = new tr.models.Radar();

    radar.setFourthQuadrant(quadrant);

    expect(radar.quadrants().IV).toEqual(quadrant);
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
      radar.setFirstQuadrant(firstQuadrant);

      expect(radar.quadrants().I.blips()[0].number()).toEqual(1);
      expect(radar.quadrants().I.blips()[1].number()).toEqual(2);
    });

    it('continues the number from the previous quadrant set', function () {
      radar.setFirstQuadrant(firstQuadrant);
      radar.setSecondQuadrant(secondQuadrant);

      expect(radar.quadrants().II.blips()[0].number()).toEqual(3);
      expect(radar.quadrants().II.blips()[1].number()).toEqual(4);
    });
  });

  describe('cycles', function () {
    var quadrant, radar, firstCycle, secondCycle;

    beforeEach(function () {
      firstCycle = new tr.models.Cycle('Adopt', 0);
      secondCycle = new tr.models.Cycle('Hold', 1);
      quadrant = new tr.models.Quadrant('Fourth');
      radar = new tr.models.Radar();
    });

    it('returns an array for a given set of blips', function () {
      quadrant.add([
        new tr.models.Blip('A', firstCycle),
        new tr.models.Blip('B', secondCycle)
      ]);

      radar.setFirstQuadrant(quadrant);

      expect(radar.cycles()).toEqual([firstCycle, secondCycle]);
    });

    it('has unique cycles', function () {
      quadrant.add([
        new tr.models.Blip('A', firstCycle),
        new tr.models.Blip('B', firstCycle),
        new tr.models.Blip('C', secondCycle)
      ]);

      radar.setFirstQuadrant(quadrant);

      expect(radar.cycles()).toEqual([firstCycle, secondCycle]);
    });

    it('has sorts by the cycle order', function () {
      quadrant.add([
        new tr.models.Blip('C', secondCycle),
        new tr.models.Blip('A', firstCycle),
        new tr.models.Blip('B', firstCycle)
      ]);

      radar.setFirstQuadrant(quadrant);

      expect(radar.cycles()).toEqual([firstCycle, secondCycle]);
    });
  });
});
