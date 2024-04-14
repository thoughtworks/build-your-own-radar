const Sheet = require('../../src/util/sheet')
const config = require('../../src/config')

jest.mock('../../src/config')
describe('sheet', function () {
  const oldEnv = process.env
  beforeEach(() => {
    config.mockReturnValue({ featureToggles: { UIRefresh2022: true } })
    process.env.API_KEY = 'API_KEY'
  })

  afterEach(() => {
    jest.clearAllMocks()
    process.env = oldEnv
  })

  it('knows to find the sheet id from published URL', function () {
    const sheet = new Sheet('https://docs.google.com/spreadsheets/d/sheetId/pubhtml')

    expect(sheet.id).toEqual('sheetId')
  })

  it('knows to find the sheet id from publicly shared URL having query params', function () {
    const sheet = new Sheet('https://docs.google.com/spreadsheets/d/sheetId?abc=xyz')

    expect(sheet.id).toEqual('sheetId')
  })

  it('knows to find the sheet id from publicly shared URL having extra path and query params', function () {
    const sheet = new Sheet('https://docs.google.com/spreadsheets/d/sheetId/edit?usp=sharing')

    expect(sheet.id).toEqual('sheetId')
  })

  it('knows to find the sheet id from publicly shared URL having no extra path or query params', function () {
    const sheet = new Sheet('https://docs.google.com/spreadsheets/d/sheetId')

    expect(sheet.id).toEqual('sheetId')
  })

  it('knows to find the sheet id from publicly shared URL with trailing slash', function () {
    const sheet = new Sheet('https://docs.google.com/spreadsheets/d/sheetId/')

    expect(sheet.id).toEqual('sheetId')
  })

  it('can identify a plain sheet ID', function () {
    const sheet = new Sheet('sheetId')

    expect(sheet.id).toEqual('sheetId')
  })

  it('calls back with nothing if the sheet exists', () => {
    const mockCallback = jest.fn()
    const xhrMock = { open: jest.fn(), send: jest.fn(), readyState: 4, status: 200, response: 'response' }
    jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock)

    const sheet = new Sheet('http://example.com/a/b/c/d/?x=y')
    sheet.validate(mockCallback)
    xhrMock.onreadystatechange(new Event(''))

    expect(xhrMock.open).toHaveBeenCalledTimes(1)
    expect(xhrMock.open).toHaveBeenCalledWith(
      'GET',
      'https://docs.google.com/spreadsheets/d/http://example.com/a/b/c/d/?x=y',
      true,
    )
    expect(xhrMock.send).toHaveBeenCalledTimes(1)
    expect(xhrMock.send).toHaveBeenCalledWith(null)
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith(null, 'API_KEY')
  })

  it('calls back with error if sheet does not exist', function () {
    const mockCallback = jest.fn()
    const xhrMock = { open: jest.fn(), send: jest.fn(), readyState: 4, status: 401, response: 'response' }
    jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock)

    const sheet = new Sheet('http://example.com/a/b/c/d/?x=y')
    sheet.validate(mockCallback)
    xhrMock.onreadystatechange(new Event(''))

    expect(xhrMock.open).toHaveBeenCalledTimes(1)
    expect(xhrMock.open).toHaveBeenCalledWith(
      'GET',
      'https://docs.google.com/spreadsheets/d/http://example.com/a/b/c/d/?x=y',
      true,
    )
    expect(xhrMock.send).toHaveBeenCalledTimes(1)
    expect(xhrMock.send).toHaveBeenCalledWith(null)
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith({ message: 'UNAUTHORIZED' }, 'API_KEY')
  })

  it('should give the sheet not found error with new message', () => {
    const errorMessage = 'Oops! We can’t find the Google Sheet you’ve entered, please check the URL of your sheet.'
    const mockCallback = jest.fn()
    const xhrMock = { open: jest.fn(), send: jest.fn(), readyState: 4, status: 404, response: 'response' }
    jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock)

    const sheet = new Sheet('http://example.com/a/b/c/d/?x=y')
    sheet.validate(mockCallback)
    xhrMock.onreadystatechange(new Event(''))

    expect(xhrMock.open).toHaveBeenCalledTimes(1)
    expect(xhrMock.open).toHaveBeenCalledWith(
      'GET',
      'https://docs.google.com/spreadsheets/d/http://example.com/a/b/c/d/?x=y',
      true,
    )
    expect(xhrMock.send).toHaveBeenCalledTimes(1)
    expect(xhrMock.send).toHaveBeenCalledWith(null)
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith({ message: errorMessage }, 'API_KEY')
  })

  it('should give the sheet not found error with old message', () => {
    const errorMessage = 'Oops! We can’t find the Google Sheet you’ve entered. Can you check the URL?'
    const mockCallback = jest.fn()
    const xhrMock = { open: jest.fn(), send: jest.fn(), readyState: 4, status: 404, response: 'response' }
    jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => xhrMock)
    config.mockReturnValue({ featureToggles: { UIRefresh2022: false } })

    const sheet = new Sheet('http://example.com/a/b/c/d/?x=y')
    sheet.validate(mockCallback)
    xhrMock.onreadystatechange(new Event(''))

    expect(xhrMock.open).toHaveBeenCalledTimes(1)
    expect(xhrMock.open).toHaveBeenCalledWith(
      'GET',
      'https://docs.google.com/spreadsheets/d/http://example.com/a/b/c/d/?x=y',
      true,
    )
    expect(xhrMock.send).toHaveBeenCalledTimes(1)
    expect(xhrMock.send).toHaveBeenCalledWith(null)
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith({ message: errorMessage }, 'API_KEY')
  })
})
