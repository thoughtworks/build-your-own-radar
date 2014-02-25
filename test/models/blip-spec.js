describe('tr.models.Blip', function () {
  it('has a name', function () {
    var blip = new tr.models.Blip('My Blip');

    expect(blip.name()).toEqual('My Blip');
  });

  it('has a cycle', function () {
    var blip = new tr.models.Blip(
      'My Blip',
      new tr.models.Cycle('My Cycle')
    );

    expect(blip.cycle().name()).toEqual('My Cycle');
  });

  it('is new', function () {
    var blip = new tr.models.Blip(
      'My Blip',
      new tr.models.Cycle('My Cycle'),
      true
    );

    expect(blip.isNew()).toBe(true);
  });

  it('is not new', function () {
    var blip = new tr.models.Blip(
      'My Blip',
      new tr.models.Cycle('My Cycle'),
      false
    );

    expect(blip.isNew()).toBe(false);
  });
});
