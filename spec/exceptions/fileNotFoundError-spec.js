const FileNotFoundError = require('../../src/exceptions/fileNotFoundError')
describe('File Not Found Error', () => {
  it('should create a FileNotFoundException', () => {
    const error = new FileNotFoundError("Oops! We can't find the CSV file you've entered")
    expect(error).toBeInstanceOf(FileNotFoundError)
    expect(error).toBeInstanceOf(Error)
    expect(error.message).toStrictEqual("Oops! We can't find the CSV file you've entered")
  })
})
