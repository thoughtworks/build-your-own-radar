describe('tr.models.Blip', function () {
  var blip;
  beforeEach(function () {
    blip = new tr.models.Blip(
      'My Blip',
      new tr.models.Cycle('My Cycle')
    );
  });

  it('has a name', function () {
    expect(blip.name()).toEqual('My Blip');
  });

  it('has a cycle', function () {
    expect(blip.cycle().name()).toEqual('My Cycle');
  });

  it('has a default number', function () {
    expect(blip.number()).toEqual(-1);
  });

  it('sets the number', function () {
    blip.setNumber(1);
    expect(blip.number()).toEqual(1);
  });

  it('is new', function () {
    blip = new tr.models.Blip(
      'My Blip',
      new tr.models.Cycle('My Cycle'),
      true
    );

    expect(blip.isNew()).toBe(true);
  });

  it('is not new', function () {
    blip = new tr.models.Blip(
      'My Blip',
      new tr.models.Cycle('My Cycle'),
      false
    );

    expect(blip.isNew()).toBe(false);
  });
});
