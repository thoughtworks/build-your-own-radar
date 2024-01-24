const {
  constructSheetUrl,
  getDocumentOrSheetId,
  getSheetName,
  getBlipIdFromUrl,
  getQuadrantFromURL,
} = require('../../src/util/urlUtils')
const queryParams = require('../../src/util/queryParamProcessor')

jest.mock('../../src/util/queryParamProcessor')
describe('Url Utils', () => {
  it('should construct the sheet url', () => {
    queryParams.mockReturnValue({ documentId: 'documentId' })
    delete window.location
    window.location = Object.create(window)
    window.location.href = 'https://thoughtworks.com/radar?sheet=radar'
    window.location.search = '?'
    const sheetUrl = constructSheetUrl('radar')

    expect(sheetUrl).toStrictEqual('https://thoughtworks.com/radar?documentId=documentId&sheetName=radar')
    expect(queryParams).toHaveBeenCalledTimes(1)
  })

  it('should construct the sheet url if sheetId is used', () => {
    queryParams.mockReturnValue({ sheetId: 'sheetId' })
    delete window.location
    window.location = Object.create(window)
    window.location.href = 'https://thoughtworks.com/radar?sheet=radar'
    window.location.search = '?'
    const sheetUrl = constructSheetUrl('radar')

    expect(sheetUrl).toStrictEqual('https://thoughtworks.com/radar?sheetId=sheetId&sheetName=radar')
    expect(queryParams).toHaveBeenCalledTimes(1)
  })

  it('should prioritize documentId before legacy sheetId', () => {
    queryParams.mockReturnValue({ documentId: 'documentId', sheetId: 'sheetId' })
    delete window.location
    window.location = Object.create(window)
    window.location.href = 'https://thoughtworks.com/radar?documentId=documentId&sheetId=sheetId'
    window.location.search = '?'

    const id = getDocumentOrSheetId()

    expect(id).toEqual('documentId')
  })

  it('supports documentId', () => {
    queryParams.mockReturnValue({ documentId: 'documentId' })
    delete window.location
    window.location = Object.create(window)
    window.location.href = 'https://thoughtworks.com/radar?documentId=documentId'
    window.location.search = '?'

    const id = getDocumentOrSheetId()

    expect(id).toEqual('documentId')
  })

  it('supports sheetId', () => {
    queryParams.mockReturnValue({ sheetId: 'sheetId' })
    delete window.location
    window.location = Object.create(window)
    window.location.href = 'https://thoughtworks.com/radar?sheetId=sheetId'
    window.location.search = '?'

    const id = getDocumentOrSheetId()

    expect(id).toEqual('sheetId')
  })

  it('supports sheetName', () => {
    queryParams.mockReturnValue({ sheetName: 'sheetName' })
    delete window.location
    window.location = Object.create(window)
    window.location.href = 'https://thoughtworks.com/radar?sheetName=sheetName'
    window.location.search = '?'

    const sheetName = getSheetName()

    expect(sheetName).toEqual('sheetName')
  })

  it('should return all if no blip id found in url', () => {
    queryParams.mockReturnValue({ some: 'param' })
    delete window.location
    window.location = Object.create(window)
    window.location.href = 'https://thoughtworks.com/radar?sheet=radar'
    window.location.search = '?'
    const quadrant = getBlipIdFromUrl()

    expect(quadrant).toBeNull()
  })

  it('should return blip id if found in url', () => {
    queryParams.mockReturnValue({ blipId: '50' })
    delete window.location
    window.location = Object.create(window)
    window.location.href = 'https://thoughtworks.com/radar?sheet=radar'
    window.location.search = '?'
    const quadrant = getBlipIdFromUrl()

    expect(quadrant).toBe(50)
  })

  it('should return all if no quadrant found in url', () => {
    queryParams.mockReturnValue({ some: 'param' })
    delete window.location
    window.location = Object.create(window)
    window.location.href = 'https://thoughtworks.com/radar?sheet=radar'
    window.location.search = '?'
    const quadrant = getQuadrantFromURL()

    expect(quadrant).toBe('all')
  })

  it('should return quadrant if found in url', () => {
    queryParams.mockReturnValue({ quadrant: 'FIRST' })
    delete window.location
    window.location = Object.create(window)
    window.location.href = 'https://thoughtworks.com/radar?sheet=radar'
    window.location.search = '?'
    const quadrant = getQuadrantFromURL()

    expect(quadrant).toBe('first')
  })
})
