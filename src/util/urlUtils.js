const QueryParams = require('../util/queryParamProcessor')

function constructSheetUrl(sheetName) {
  const noParamsUrl = window.location.href.substring(0, window.location.href.indexOf(window.location.search))
  const queryParams = QueryParams(window.location.search.substring(1))
  const sheetUrl =
    noParamsUrl +
    '?' +
    ((queryParams.documentId && `documentId=${encodeURIComponent(queryParams.documentId)}`) ||
      (queryParams.sheetId && `sheetId=${encodeURIComponent(queryParams.sheetId)}`) ||
      '') +
    '&sheetName=' +
    encodeURIComponent(sheetName)
  return sheetUrl
}

function getDocumentOrSheetId() {
  const queryParams = QueryParams(window.location.search.substring(1))
  return queryParams.documentId ?? queryParams.sheetId
}

function getSheetName() {
  const queryParams = QueryParams(window.location.search.substring(1))
  return queryParams.sheetName
}

function getBlipIdFromUrl() {
  const queryParams = QueryParams(window.location.search.substring(1))
  const blipQueryString = queryParams.blipId

  const blipId = parseInt(blipQueryString)

  return isNaN(blipId) ? null : blipId
}

function getQuadrantFromURL() {
  const queryParams = QueryParams(window.location.search.substring(1))
  const quadrantQueryString = queryParams.quadrant

  return quadrantQueryString?.toLowerCase() ?? 'all'
}

module.exports = {
  constructSheetUrl,
  getDocumentOrSheetId,
  getSheetName,
  getBlipIdFromUrl,
  getQuadrantFromURL,
}
