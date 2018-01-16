const express = require('express');
const { resolve } = require('path');

var app = express();


app.use('/', express.static(resolve(__dirname, 'dist-radar')));


app.listen(8080, function(){
    console.log('Listening on port 8080 !');
});