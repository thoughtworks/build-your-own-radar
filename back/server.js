const express = require('express');
const { resolve } = require('path');
const fs = require('fs');

var app = express();

const apiRouter = require('./apiRouter');

app.use('/api', apiRouter);
app.use('/', express.static(resolve(__dirname, 'dist-radar')));


app.listen(8000, function(){
    console.log('Listening on port 8000 !');
});