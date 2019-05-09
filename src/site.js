require('./common')
const normalizedConfig = require('./util/normalizedConfig')
require('./images/logo.png')

if (normalizedConfig.logo && !normalizedConfig.logo.match(/http(s)?:/i)) {
  require('./images/' + normalizedConfig.logo)
}
require('./images/radar_legend.png')

const GoogleSheetInput = require('./util/factory')

GoogleSheetInput().build()
