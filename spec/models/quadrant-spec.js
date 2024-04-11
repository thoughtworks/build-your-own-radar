const Quadrant = require('../../src/models/quadrant');
const Blip = require('../../src/models/blip');

describe('Quadrant', () => {
  it('has a name', () => {
    var quadrant = new Quadrant('My Quadrant');

    expect(quadrant.name()).toEqual('My Quadrant');
  });

  it('has no blips by default', () => {
    var quadrant = new Quadrant('My Quadrant');

    expect(quadrant.blips()).toEqual([]);
  });

  it('can add a single blip', () => {
    var quadrant = new Quadrant('My Quadrant');

    quadrant.add(new Blip());

    expect(quadrant.blips()).toHaveLength(1);
  });

  it('can add multiple blips', () => {
    var quadrant = new Quadrant('My Quadrant');

    quadrant.add([new Blip(), new Blip()]);

    expect(quadrant.blips()).toHaveLength(2);
  });
});
