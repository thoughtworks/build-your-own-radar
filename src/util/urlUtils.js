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

/**
 * Converts relative URLs in HTML content to absolute URLs.
 * This is useful for PDF printing where relative URLs like "/radar/..." 
 * need to show the full URL.
 * @param {string} html - HTML content potentially containing relative URLs
 * @returns {string} HTML with relative URLs converted to absolute
 */
function convertRelativeUrlsToAbsolute(html) {
  if (!html) return html
  
  const baseUrl = window.location.origin
  
  // Convert relative href attributes to absolute URLs
  return html.replace(
    /href=["'](?!https?:\/\/|mailto:|tel:)([^"']+)["']/gi,
    (match, relativeUrl) => {
      // Handle protocol-relative URLs (//example.com)
      if (relativeUrl.startsWith('//')) {
        return `href="${window.location.protocol}${relativeUrl}"`
      }
      // Handle root-relative URLs (/path)
      if (relativeUrl.startsWith('/')) {
        return `href="${baseUrl}${relativeUrl}"`
      }
      // Handle relative URLs (path or ./path)
      return `href="${baseUrl}/${relativeUrl.replace(/^\.\//, '')}"`
    }
  )
}

module.exports = {
  constructSheetUrl,
  getDocumentOrSheetId,
  getSheetName,
  convertRelativeUrlsToAbsolute,
}
