const InvalidContentError = require('../../src/exceptions/invalidContentError')
describe('Invalid Content Error', () => {
  it('should create a Invalid content Error', () => {
    const error = new InvalidContentError('Invalid Content')
    expect(error).toBeInstanceOf(InvalidContentError)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toStrictEqual('Invalid Content')
  })
})
