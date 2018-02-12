const d3 = require('d3');
const Tabletop = require('tabletop');
const _ = {
    map: require('lodash/map'),
    uniqBy: require('lodash/uniqBy'),
    capitalize: require('lodash/capitalize'),
    each: require('lodash/each')
};

const InputSanitizer = require('./inputSanitizer');
const Radar = require('../models/radar');
const Quadrant = require('../models/quadrant');
const Ring = require('../models/ring');
const Blip = require('../models/blip');
const GraphingRadar = require('../graphing/radar');
const MalformedDataError = require('../exceptions/malformedDataError');
const SheetNotFoundError = require('../exceptions/sheetNotFoundError');
const ContentValidator = require('./contentValidator');
const Sheet = require('./sheet');
const ExceptionMessages = require('./exceptionMessages');

const plotRadar = function (title, blips) {
    document.title = title;

    var rings = _.map(_.uniqBy(blips, 'ring'), 'ring');
    var ringMap = {};
    var maxRings = 4;

    _.each(rings, function (ringName, i) {
        if (i == maxRings) {
            throw new MalformedDataError(ExceptionMessages.TOO_MANY_RINGS);
        }
        ringMap[ringName] = new Ring(ringName, i);
    });

    var arcs = {};
    _.each(blips, function (blip) {
        if (!arcs[blip.quadrant]) {
            arcs[blip.quadrant] = new Quadrant(_.capitalize(blip.quadrant));
        }
        arcs[blip.quadrant].add(new Blip(blip.name, ringMap[blip.ring], blip.isNew.toLowerCase() === 'true', blip.topic, blip.description))
    });
    
    var radar = new Radar({arcs});

    var size = (window.innerHeight - 133) < 620 ? 620 : window.innerHeight - 133;

    new GraphingRadar(size, radar).init().plot();
}

const CSVContent = function (fileContent) {
    var data = d3.csvParse(fileContent);
    var columnNames = data['columns'];
    delete data['columns'];
    var contentValidator = new ContentValidator(columnNames);
    contentValidator.verifyContent();
    contentValidator.verifyHeaders();
    var blips = _.map(data, new InputSanitizer().sanitize);
    return blips;
}


const hideBlips = function(indexes){
    let allBlips = d3.selectAll('g.blip-link');
    if(indexes.length === 0){
        allBlips.style('display', null);
    } else {
        allBlips.nodes().forEach((e)=>{
            let intx = parseInt(e.textContent);
            if (indexes.indexOf(intx) === -1){
                e.style.display = 'none';
            }else{
                e.style.display = null;
            }
        });
    }
}

module.exports = {
    CSVContent,
    plotRadar,
    hideBlips
};