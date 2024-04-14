const { toRadian } = require('../../src/util/mathUtils');

describe('Math Utils', () => {
  it('should convert into radian', () => {
    expect(toRadian(180)).toEqual(Math.PI);
  });
});
