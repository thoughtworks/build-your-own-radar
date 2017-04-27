require('./stylesheets/base.scss');
require('./images/logo.png');
require('./images/landing-page.png');
require('./images/tw-logo.png');
require('./images/favicon.ico');
require('./images/radar_legend.png');

const ExcelSheetInput = require('./util/factory');

ExcelSheetInput().build();