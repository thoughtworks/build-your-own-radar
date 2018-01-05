require('./stylesheets/base.scss');
require('./images/logo.png');
require('./images/tech-radar-201611-landing-page-wide.png');
require('./images/tw-logo.png');
require('./images/favicon.ico');
require('./images/radar_legend.png');

var csvContent = require('./radar.csv');

var {
    CSVContent,
    plotRadar
} = require('./util/factory')

var blips = CSVContent(csvContent)

plotRadar('title', blips);