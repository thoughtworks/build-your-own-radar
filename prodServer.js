'use strict';

var express = require('express');
var server = express();
server.use('/', express.static(__dirname + '/dist/'));
server.listen(8080);

console.log("webserver listening on 8080 ", Date());