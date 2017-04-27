const d3 = require('d3');
const Tabletop = require('tabletop');
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
const Sheet = require('./sheet');
const fs = require('browserify-fs');
const path = require('path');

const ExcelSheet = function (fileName) {

    var self = {};

    self.build = function () {

        var url = "xls/" + fileName;

        var oReq = new XMLHttpRequest();

        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";


       oReq.onload = function(e) {
           console.log(e);

           var arraybuffer = oReq.response;

            /* convert data to binary string */
            var data = new Uint8Array(arraybuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");

            /* Call XLSX */
            var workbook = XLSX.read(bstr, {type:"binary"});

            /* Get worksheet */
            var worksheet = workbook.Sheets["Feuil1"];

            console.log(fileName);
            console.log(worksheet);
            console.log(worksheet["!ref"])

            var columnsName = getColumnNames(worksheet);
            console.log(columnsName);

            createRadar(worksheet);

        }

        oReq.send();

        function createRadar(worksheet) {

            try {

                //if (!sheetName) {
                //    sheetName = tabletop.foundSheetNames[0];
                //}

                var columnNames = getColumnNames(worksheet);
                console.log("colones:");
                console.log(columnNames);

                var contentValidator = new ContentValidator(columnNames);
                contentValidator.verifyContent();
                contentValidator.verifyHeaders();

               // var all = tabletop.sheets(sheetName).all();
                console.log("all blips")
                var all = getElements(worksheet);

                console.log(all);

                var blips = _.map(all, new InputSanitizer().sanitize);

                document.title = "test ok";
                d3.selectAll(".chargement").remove();

                var rings = _.map(_.uniqBy(blips, 'ring'), 'ring');
                var ringMap = {};
                var maxRings = 4;

                _.each(rings, function (ringName, i) {

                    console.log(rings);
                    console.log(ringName + ": " + i + " : " + maxRings)

                    /*if (i == maxRings) {
                        throw new MalformedDataError(ExceptionMessages.TOO_MANY_RINGS);
                    }*/
                    ringMap[ringName] = new Ring(ringName, i);
                });

                var quadrants = {};
                _.each(blips, function (blip) {
                    if (!quadrants[blip.quadrant]) {
                        quadrants[blip.quadrant] = new Quadrant(_.capitalize(blip.quadrant));
                    }

                    console.log(blip.topic);
                    console.log(quadrants);
                    //quadrants[blip.quadrant] = {};
                    quadrants[blip.quadrant].add(new Blip(blip.name, ringMap[blip.ring], blip.isNew.toLowerCase() === 'true', blip.topic, blip.description))
                });

                var radar = new Radar();
                _.each(quadrants, function (quadrant) {
                    radar.addQuadrant(quadrant)
                });

                var size = (window.innerHeight - 133) < 620 ? 620 : window.innerHeight - 133;

                new GraphingRadar(size, radar).init().plot();

            } catch (exception) {
                console.log(exception);
                displayErrorMessage(exception);
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

                    //console.log(cell.h)
                }

            }

            return columnnames;
        }

        function getElements (worksheet) {
            var elementsName = [];

            var range = XLSX.utils.decode_range(worksheet['!ref']);
            var col, line = range.s.r + 1;

           // console.log(col)
            //console.log(line)

            for(line = range.s.r + 1; line <= range.e.r; ++line){

               // Blip = function (name, ring, isNew, topic, description) {

                var blip = {};

                blip.name = worksheet[XLSX.utils.encode_cell({c:0, r:line})].h;
                blip.ring = worksheet[XLSX.utils.encode_cell({c:1, r:line})].h;
                blip.quadrant = worksheet[XLSX.utils.encode_cell({c:2, r:line})].h;
                blip.isNew = worksheet[XLSX.utils.encode_cell({c:3, r:line})].h;
                blip.description = worksheet[XLSX.utils.encode_cell({c:4, r:line})].h;



                console.log(blip)

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

        var bannerText = '<h1>Building your radar...</h1><p>Your Technology Radar will be available in just a few seconds</p>';
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
        var worksheet = workbook.Sheets["Feuil1"];

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

        console.log(filesArray);

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
            var sheet = ExcelSheet(queryParams.f);
            sheet.init().build();
        } else {

            var content = d3.select('body')
                .append('div')
                .attr('class', 'input-sheet');

            set_document_title();

            plotLogo(content);

            var bannerText = '<h1>Build your own radar</h1>';



            getFiles(function (allFiles) {
                console.log(allFiles);
                allFiles.files.forEach(function (file){
                    bannerText = bannerText.concat("<span><a href='/?f=" + file.name + "'>" + file.desc + "</a></span>");
                    console.log(file);
                });
                bannerText = bannerText.concat("</p>");

                console.log(bannerText);

                plotBanner(content, bannerText);



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

function plotBanner(content, text) {
    content.append('div')
        .attr('class', 'input-sheet__banner')
        .html(text);

}

function plotForm(content) {
    content.append('div')
        .attr('class', 'input-sheet__form')
        .append('p')
        .html('<strong>Enter the URL of your <a href="https://info.thoughtworks.com/visualize-your-tech-strategy-guide.html#publish-byor-sheet" target="_blank">published</a> Google Sheet below…</strong>');

    var form = content.select('.input-sheet__form').append('form')
        .attr('method', 'get');

    form.append('input')
        .attr('type', 'text')
        .attr('name', 'sheetId')
        .attr('placeholder', 'e.g. https://docs.google.com/spreadsheets/d/1waDG0_W3-yNiAaUfxcZhTKvl7AUCgXwQw8mdPjCz86U/');

    form.append('button')
        .attr('type', 'submit')
        .append('a')
        .attr('class', 'button')
        .text('Build my radar');

    form.append('p').html("<a href='https://info.thoughtworks.com/visualize-your-tech-strategy-guide.html#faq'>Need help?</a>");
}

module.exports = ExcelSheetInput;
