require('./stylesheets/base.scss');
require('./images/capgemini-logo.png');
require('./images/favicon.ico');
require('./images/radar_legend_v0.1.png');

const GoogleSheetInput = require('./util/factory');

GoogleSheetInput().build();