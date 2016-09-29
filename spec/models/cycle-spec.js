const Cycle = require('../../src/models/cycle');

describe('Cycle', function () {
  it('has a name', function () {
    var cycle = Cycle('My Cycle');

    expect(cycle.name()).toEqual('My Cycle');
  });

  it('has a order', function () {
    var cycle = new Cycle('My Cycle', 0);

    expect(cycle.order()).toEqual(0);
  });
});
