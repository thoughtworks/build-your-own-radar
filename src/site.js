require('./common')
require('./images/logo.png')
require('./images/radar_legend.png')
require('./gtm.js')
require('./data/data.csv')

const CSVDocument = require('./util/factory')

CSVDocument('data/data.csv').init().build()
