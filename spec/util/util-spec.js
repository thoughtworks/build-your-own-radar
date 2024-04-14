const { getRingIdString } = require('../../src/util/stringUtil')

describe('Utils', () => {
  it('should return id string for ring name', () => {
    expect(getRingIdString('Tools')).toStrictEqual('tools')
    expect(getRingIdString('Platform Tools')).toStrictEqual('platform-tools')
    expect(getRingIdString('Languages & Frameworks')).toStrictEqual('languages---frameworks')
  })
})
