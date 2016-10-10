const Ring = require('../../src/models/ring');

describe('Ring', function () {
  it('has a name', function () {
    var ring = Ring('My Ring');

    expect(ring.name()).toEqual('My Ring');
  });

  it('has a order', function () {
    var ring = new Ring('My Ring', 0);

    expect(ring.order()).toEqual(0);
  });
});
