require('./common')
require('./images/logo.png')
require('./images/radar_legend.png')
require('./gtm.js')

const RadarInput = require('./util/factory')

if (process.env.SHEET_ID) {
  RadarInput().build(process.env.SHEET_ID, process.env.SHEET_NAME)
} else {
  const QueryParams = require('./util/queryParamProcessor')

  var queryString = window.location.href.match(/sheetId(.*)/)
  var queryParams = queryString ? QueryParams(queryString[0]) : {}

  RadarInput().build(queryParams.sheetId, queryParams.sheetName)
}
