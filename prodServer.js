'use strict';

var express = require('express');
var server = express();
server.use('/', express.static(__dirname + '/dist/'));
server.listen(3000);

console.log("webserver listening on 3000 ", Date());