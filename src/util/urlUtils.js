const QueryParams = require('../util/queryParamProcessor')
const config = require('../config')
function constructSheetUrl(sheetName) {
  const noParamsUrl = window.location.href.substring(0, window.location.href.indexOf(window.location.search))
  const queryParams = QueryParams(window.location.search.substring(1))
  const sheetUrl =
    noParamsUrl +
    (config().featureToggles.UIRefresh2022
      ? '?documentId=' + queryParams.documentId
      : '?sheetId=' + queryParams.sheetId) +
    '&sheetName=' +
    encodeURIComponent(sheetName)
  return sheetUrl
}

module.exports = {
  constructSheetUrl,
}
