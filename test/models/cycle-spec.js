describe('tr.models.Cycle', function () {
  it('has a name', function () {
    var cycle = new tr.models.Cycle('My Cycle');

    expect(cycle.name()).toEqual('My Cycle');
  });

  it('has a order', function () {
    var cycle = new tr.models.Cycle('My Cycle', 0);

    expect(cycle.order()).toEqual(0);
  });
});
