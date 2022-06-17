require('./common')
require('./images/logo.png')
require('./images/radar_legend.png')
require('./gtm.js')
require('./radars/radars')

const GoogleSheetInput = require('./util/factory')

GoogleSheetInput().build()
