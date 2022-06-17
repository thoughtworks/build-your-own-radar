require('./stylesheets/base.scss')
require('./images/tech-radar-landing-page-wide.png')
require('./images/favicon.ico')
require('./images/search-logo-2x.svg')
require('./images/banner-image-mobile.jpg')
require('./images/banner-image-desktop.jpg')

const config = require('config')
require('.' + config.tenant.logo.image)
