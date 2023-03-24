const { constructSheetUrl } = require('../../src/util/urlUtils')
const config = require('../../src/config')
const queryParams = require('../../src/util/queryParamProcessor')

jest.mock('../../src/config')
jest.mock('../../src/util/queryParamProcessor')
describe('Url Utils', () => {
  it('should construct the sheet url', () => {
    config.mockReturnValue({ featureToggles: { UIRefresh2022: true } })
    queryParams.mockReturnValue({ documentId: 'documentId' })
    delete window.location
    window.location = Object.create(window)
    window.location.href = 'https://thoughtworks.com/radar?sheet=radar'
    window.location.search = '?'
    const sheetUrl = constructSheetUrl('radar')

    expect(sheetUrl).toStrictEqual('https://thoughtworks.com/radar?documentId=documentId&sheetName=radar')
    expect(config).toHaveBeenCalledTimes(1)
    expect(queryParams).toHaveBeenCalledTimes(1)
  })

  it('should construct the sheet url for old view', () => {
    config.mockReturnValue({ featureToggles: { UIRefresh2022: false } })
    queryParams.mockReturnValue({ sheetId: 'sheetId' })
    delete window.location
    window.location = Object.create(window)
    window.location.href = 'https://thoughtworks.com/radar?sheet=radar'
    window.location.search = '?'
    const sheetUrl = constructSheetUrl('radar')

    expect(sheetUrl).toStrictEqual('https://thoughtworks.com/radar?sheetId=sheetId&sheetName=radar')
    expect(config).toHaveBeenCalledTimes(1)
    expect(queryParams).toHaveBeenCalledTimes(1)
  })
})
