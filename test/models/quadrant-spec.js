describe('tr.models.Quadrant', function () {
  it('has a name', function () {
    var quadrant = new tr.models.Quadrant('My Quadrant');

    expect(quadrant.name()).toEqual('My Quadrant');
  });

  it('has no blips by default', function () {
    var quadrant = new tr.models.Quadrant('My Quadrant');

    expect(quadrant.blips()).toEqual([]);
  });

  it('can add a single blip', function () {
    var quadrant = new tr.models.Quadrant('My Quadrant');

    quadrant.add(new tr.models.Blip());

    expect(quadrant.blips().length).toEqual(1);
  });

  it('can add multiple blips', function () {
    var quadrant = new tr.models.Quadrant('My Quadrant');

    quadrant.add([new tr.models.Blip(), new tr.models.Blip()]);

    expect(quadrant.blips().length).toEqual(2);
  });
});
