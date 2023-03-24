const { toRadian } = require('../../src/util/mathUtils')

describe('Math Utils', function () {
  it('should convert into radian', function () {
    expect(toRadian(180)).toEqual(Math.PI)
  })
})
