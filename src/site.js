require('./stylesheets/base.scss');
require('./images/logo.png');
require('./images/tech-radar-201611-landing-page-wide.png');
require('./images/tw-logo.png');
require('./images/favicon.ico');
require('./images/radar_legend.png');
require('./resources/data/data.csv');


const GoogleSheetInput = require('./util/factory');
GoogleSheetInput().build();

