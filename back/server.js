const express = require('express');
const { resolve } = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const config = {
    db: 'mongodb://localhost/mern-crud'
};

// Use Node's default promise instead of Mongoose's promise library
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(config.db);
let db = mongoose.connection;

db.on('open', () => {
    console.log('Connected to the database.');
});

db.on('error', (err) => {
    console.log(`Database error: ${err}`);
});

var app = express();

const apiRouter = require('./apiRouter');

app.use('/api', apiRouter);
app.use('/', express.static(resolve(__dirname, '..', 'dist-radar')));


app.listen(8000, function () {
    console.log('Listening on port 8000 !');
});