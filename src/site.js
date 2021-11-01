require('./common')
require('./images/logo.png')
require('./images/radar_legend.png')
require('./gtm.js')
const { config } = require('./config.js')

const GoogleSheetInput = require('./util/factory')

GoogleSheetInput().build()

if (!window.location.href.includes('?sheetId')) {
    window.location.replace(window.location.href + '?sheetId=' + config.sheetUrl)
}