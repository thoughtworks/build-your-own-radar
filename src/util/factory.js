const d3 = require('d3');
const _ = {
    map: require('lodash/map'),
    uniqBy: require('lodash/uniqBy'),
    capitalize: require('lodash/capitalize'),
    each: require('lodash/each')
};
var XLSX = require('xlsx');
const InputSanitizer = require('./inputSanitizer');
const Radar = require('../models/radar');
const Quadrant = require('../models/quadrant');
const Ring = require('../models/ring');
const Blip = require('../models/blip');
const GraphingRadar = require('../graphing/radar');
const ContentValidator = require('./contentValidator');
const fs = require('browserify-fs');
const path = require('path');

const ExcelSheet = function (fileName, description) {

    var self = {};

    self.build = function () {

        var url = "xls/" + fileName;

        if(description === undefined){
            description = fileName;
        }

        var oReq = new XMLHttpRequest();

        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";


        oReq.onload = function(e) {
            console.log(e);

            var arraybuffer = oReq.response;

            /* convert data to binary string */
            var data = new Uint8Array(arraybuffer);
            var arr = new Array();

            for(var i = 0; i != data.length; ++i) {
                arr[i] = String.fromCharCode(data[i]);
            }

            var bstr = arr.join("");

            /* Call XLSX */
            var workbook = XLSX.read(bstr, {type:"binary"});

            console.log(workbook);

            /* Get worksheet */
            var worksheet = workbook.Sheets["Feuil1"];

            var columnsName = getColumnNames(worksheet);

            createRadar(worksheet,description);

        }

        oReq.send();

        function createRadar(worksheet,description) {

            try {

                var columnNames = getColumnNames(worksheet);

                var contentValidator = new ContentValidator(columnNames);
                contentValidator.verifyContent();
                contentValidator.verifyHeaders();

                var all = getElements(worksheet);


                var blips = _.map(all, new InputSanitizer().sanitize);

                document.title = description;
                d3.selectAll(".chargement").remove();

                var rings = _.map(_.uniqBy(blips, 'ring'), 'ring');
                var ringMap = {};
                var maxRings = 4;

                _.each(rings, function (ringName, i) {

                    ringMap[ringName] = new Ring(ringName, i);
                });

                var quadrants = {};
                _.each(blips, function (blip) {
                    if (!quadrants[blip.quadrant]) {
                        quadrants[blip.quadrant] = new Quadrant(_.capitalize(blip.quadrant));
                    }

                    quadrants[blip.quadrant]
                        .add(new Blip(blip.name,
                                ringMap[blip.ring],
                                blip.isNew.toLowerCase() === 'true',
                                blip.topic,
                                blip.description))
                });

                var radar = new Radar();
                _.each(quadrants, function (quadrant) {
                    radar.addQuadrant(quadrant)
                });

                var size = (window.innerHeight - 133) < 620 ? 620 : window.innerHeight - 133;

                new GraphingRadar(size, radar).init().plot();

            } catch (exception) {
                console.log(exception);
            }
        }

        function getColumnNames (worksheet) {
            var columnnames = [];

            var range = XLSX.utils.decode_range(worksheet['!ref']);
            var col, line = range.s.r;

            for(col = range.s.c; col <= range.e.c; ++col) {
                var cell = worksheet[XLSX.utils.encode_cell({c:col, r:line})] /* find the cell in the first row */

                if(cell !== undefined){
                    columnnames.push(cell.h);
                }
            }

            return columnnames;
        }

        function getElements (worksheet) {
            var elementsName = [];

            var range = XLSX.utils.decode_range(worksheet['!ref']);
            var col, line = range.s.r + 1;


            for(line = range.s.r + 1; line <= range.e.r; ++line){


                var blip = {};

                blip.name = worksheet[XLSX.utils.encode_cell({c:0, r:line})].h;
                blip.ring = worksheet[XLSX.utils.encode_cell({c:1, r:line})].h;
                blip.quadrant = worksheet[XLSX.utils.encode_cell({c:2, r:line})].h;
                blip.isNew = worksheet[XLSX.utils.encode_cell({c:3, r:line})].h;
                blip.description = worksheet[XLSX.utils.encode_cell({c:4, r:line})].v;

                console.log(XLSX);
                console.log(XLSX.utils);

                console.log(blip.description);

                var topic = worksheet[XLSX.utils.encode_cell({c:5, r:line})];

                if(topic !== undefined){
                    blip.topic = topic.h;
                }
               // blip.topic = worksheet[XLSX.utils.encode_cell({c:5, r:line})].h;

                elementsName.push(blip);

            }

            return elementsName;
        }
    };

    self.init = function () {
        var content = d3.select('body')
            .append('div')
            .attr('class', 'chargement')
            .append('div')
            .attr('class', 'input-sheet');

        set_document_title();

        plotLogo(content);

        var bannerText = '<h1>En cours de génération...</h1><p>Cela vient...</p>';
        plotBanner(content, bannerText);
        plotFooter(content);


        return self;
    };

    return self;
}


var QueryParams = function (queryString) {
    var decode = function (s) {
        return decodeURIComponent(s.replace(/\+/g, " "));
    };

    var search = /([^&=]+)=?([^&]*)/g;

    var queryParams = {};
    var match;
    while (match = search.exec(queryString))
        queryParams[decode(match[1])] = decode(match[2]);

    return queryParams
};

function getWorkSheet () {
    console.log('before')
    var url = "xls/test1.xlsx";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
        var arraybuffer = oReq.response;

        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");

        /* Call XLSX */
        var workbook = XLSX.read(bstr, {type:"binary"});

        /* Get worksheet */
        var worksheet = workbook.Sheets[0];
        console.log("name")
        //alert(worksheet.name);

        return worksheet;
    }

    oReq.send();

    console.log('after')
}

function getFiles (callback) {
    console.log('before')
    var url = "xls/directory.json";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "json";

    oReq.onload = function(e) {
        var filesArray = oReq.response;

        //console.log(filesArray);

        filesArray.files.forEach(function (f){
            console.log(f);
        })

        callback(filesArray);
    }

    oReq.send();

    console.log('after')


}



//Gere les requetes entrantes et le chargement de l'app
const ExcelSheetInput = function () {

    var self = {};

    //Point d'entrée app
    self.build = function () {

        //recup query
        var queryParams = QueryParams(window.location.search.substring(1));
        console.log(queryParams);


        //si param f ok
        if (queryParams.f) {
            var sheet = ExcelSheet(queryParams.f,queryParams.d);
            sheet.init().build();
        } else {

            var content = d3.select('body')
                .append('div')
                .attr('class', 'input-sheet');

            set_document_title();

            plotLogo(content);

            var bannerText = '<h1>Versions</h1>';

            var versionsList = '<div>';



            getFiles(function (allFiles) {
                console.log(allFiles);
                allFiles.files.forEach(function (file){
                    versionsList = versionsList.concat("<div><a class='versions-link' href='/?f=",file.name,"&d=",file.desc,"'>",file.desc,"</a></div>");
                    //console.log(file);
                });

                versionsList = versionsList.concat("</ul></div>");

                //bannerText = bannerText.concat("</p>");

                console.log(bannerText);



                plotBanner(content, bannerText);

                plotVersionsList(content,versionsList);

                plotFooter(content);



            });






        }
    };

    return self;
};

function set_document_title() {
    document.title = "Radar Technologique";
}

function plotLogo(content) {
    content.append('div')
        .attr('class', 'input-sheet__logo')
        .html('<a href="https://www.thoughtworks.com"><img src="/images/tw-logo.png" / ></a>');
}

function plotFooter(content) {
    content
        .append('div')
        .attr('id', 'footer')
        .append('div')
        .attr('class', 'footer-content')
        .append('p')
        .html('Librement inspiré du Radar Technologique de <a href="https://www.thoughtworks.com"> ThoughtWorks</a>. ');

}
function plotVersionsList(content, html){
    content
        .append('div')
        .attr('class', 'versions-list')
        .html(html);
}


function plotBanner(content, text) {


    content.append('div')
        .attr('class', 'input-sheet__banner')
        .html(text);


}


module.exports = ExcelSheetInput;
