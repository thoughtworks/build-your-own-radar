describe('tr.models.Cycle', function () {
  it('has a name', function () {
    var cycle = new tr.models.Cycle('My Cycle');

    expect(cycle.name()).toEqual('My Cycle');
  });
});
