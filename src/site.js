require('./common');
require('./images/logo.png');
require('./images/radar_legend.png');

var csvContent = require('./radar.csv');

var {
    CSVContent,
    plotRadar
} = require('./util/factory')

var blips = CSVContent(csvContent)

plotRadar('title', blips);