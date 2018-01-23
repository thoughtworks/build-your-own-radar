require('./common');
require('./images/logo.png');
require('./images/radar_legend.png');

const GoogleAuth = require('./util/googleAuth');
const GoogleSheetInput = require('./util/factory');

GoogleAuth.loadGoogle(function () {
    GoogleSheetInput().build();
})
