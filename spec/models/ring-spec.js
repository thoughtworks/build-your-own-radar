const Ring = require('../../src/models/ring');

describe('Ring', () => {
  it('has a name', () => {
    var ring = Ring('My Ring');

    expect(ring.name()).toEqual('My Ring');
  });

  it('has a order', () => {
    var ring = new Ring('My Ring', 0);

    expect(ring.order()).toEqual(0);
  });
});
