const InvalidConfigError = require('../../src/exceptions/invalidConfigError')
describe('Invalid Config Error', () => {
  it('should create a InvalidConfigError', () => {
    const error = new InvalidConfigError('Invalid Configuration')
    expect(error).toBeInstanceOf(InvalidConfigError)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toStrictEqual('Invalid Configuration')
  })
})
