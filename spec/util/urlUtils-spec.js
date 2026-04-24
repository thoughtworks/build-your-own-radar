const {
  constructSheetUrl,
  getDocumentOrSheetId,
  getSheetName,
  convertRelativeUrlsToAbsolute,
} = require('../../src/util/urlUtils')
const queryParams = require('../../src/util/queryParamProcessor')

jest.mock('../../src/util/queryParamProcessor')

function setWindowLocation(url) {
  window.history.replaceState(null, '', url)
}

describe('Url Utils', () => {
  it('should construct the sheet url', () => {
    queryParams.mockReturnValue({ documentId: 'documentId' })
    setWindowLocation('https://thoughtworks.com/radar?sheet=radar')
    const sheetUrl = constructSheetUrl('radar')

    expect(sheetUrl).toStrictEqual('https://thoughtworks.com/radar?documentId=documentId&sheetName=radar')
    expect(queryParams).toHaveBeenCalledTimes(1)
  })

  it('should construct the sheet url if sheetId is used', () => {
    queryParams.mockReturnValue({ sheetId: 'sheetId' })
    setWindowLocation('https://thoughtworks.com/radar?sheet=radar')
    const sheetUrl = constructSheetUrl('radar')

    expect(sheetUrl).toStrictEqual('https://thoughtworks.com/radar?sheetId=sheetId&sheetName=radar')
    expect(queryParams).toHaveBeenCalledTimes(1)
  })

  it('should prioritize documentId before legacy sheetId', () => {
    queryParams.mockReturnValue({ documentId: 'documentId', sheetId: 'sheetId' })
    setWindowLocation('https://thoughtworks.com/radar?documentId=documentId&sheetId=sheetId')

    const id = getDocumentOrSheetId()

    expect(id).toEqual('documentId')
  })

  it('supports documentId', () => {
    queryParams.mockReturnValue({ documentId: 'documentId' })
    setWindowLocation('https://thoughtworks.com/radar?documentId=documentId')

    const id = getDocumentOrSheetId()

    expect(id).toEqual('documentId')
  })

  it('supports sheetId', () => {
    queryParams.mockReturnValue({ sheetId: 'sheetId' })
    setWindowLocation('https://thoughtworks.com/radar?sheetId=sheetId')

    const id = getDocumentOrSheetId()

    expect(id).toEqual('sheetId')
  })

  it('supports sheetName', () => {
    queryParams.mockReturnValue({ sheetName: 'sheetName' })
    setWindowLocation('https://thoughtworks.com/radar?sheetName=sheetName')

    const sheetName = getSheetName()

    expect(sheetName).toEqual('sheetName')
  })

  describe('convertRelativeUrlsToAbsolute', () => {
    beforeEach(() => {
      delete window.location
      window.location = Object.create(window)
      window.location.origin = 'https://radar.thoughtworks.com'
      window.location.protocol = 'https:'
    })

    it('should return empty string for empty input', () => {
      expect(convertRelativeUrlsToAbsolute('')).toEqual('')
    })

    it('should return null for null input', () => {
      expect(convertRelativeUrlsToAbsolute(null)).toEqual(null)
    })

    it('should return undefined for undefined input', () => {
      expect(convertRelativeUrlsToAbsolute(undefined)).toEqual(undefined)
    })

    it('should not modify absolute URLs', () => {
      const html = '<a href="https://example.com/page">Link</a>'
      expect(convertRelativeUrlsToAbsolute(html)).toEqual(html)
    })

    it('should not modify mailto links', () => {
      const html = '<a href="mailto:test@example.com">Email</a>'
      expect(convertRelativeUrlsToAbsolute(html)).toEqual(html)
    })

    it('should not modify tel links', () => {
      const html = '<a href="tel:+1234567890">Call</a>'
      expect(convertRelativeUrlsToAbsolute(html)).toEqual(html)
    })

    it('should convert root-relative URLs to absolute', () => {
      const html = '<a href="/radar/Techniques/continuous-delivery">CD</a>'
      const expected = '<a href="https://radar.thoughtworks.com/radar/Techniques/continuous-delivery">CD</a>'
      expect(convertRelativeUrlsToAbsolute(html)).toEqual(expected)
    })

    it('should convert relative URLs to absolute', () => {
      const html = '<a href="page/subpage">Link</a>'
      const expected = '<a href="https://radar.thoughtworks.com/page/subpage">Link</a>'
      expect(convertRelativeUrlsToAbsolute(html)).toEqual(expected)
    })

    it('should convert protocol-relative URLs', () => {
      const html = '<a href="//example.com/page">Link</a>'
      const expected = '<a href="https://example.com/page">Link</a>'
      expect(convertRelativeUrlsToAbsolute(html)).toEqual(expected)
    })

    it('should handle multiple links in the same HTML', () => {
      const html =
        '<p>Check out <a href="/radar/Techniques/cd">CD</a> and <a href="https://example.com">Example</a></p>'
      const expected =
        '<p>Check out <a href="https://radar.thoughtworks.com/radar/Techniques/cd">CD</a> and <a href="https://example.com">Example</a></p>'
      expect(convertRelativeUrlsToAbsolute(html)).toEqual(expected)
    })

    it('should handle single quotes in href', () => {
      const html = "<a href='/radar/page'>Link</a>"
      // Note: the regex normalizes quotes to double quotes
      const expected = '<a href="https://radar.thoughtworks.com/radar/page">Link</a>'
      expect(convertRelativeUrlsToAbsolute(html)).toEqual(expected)
    })
  })
})
