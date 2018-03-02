const express = require('express');
const { resolve } = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const authMid = require('./auth');

let mongodb = 'mongo';
if(process.env.ENV == 'DEV') {
    mongodb = 'localhost';
}
console.log(mongodb);

const config = {
    db: `mongodb://${mongodb}/mern-crud`
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
// app.use('/admin', authMid, express.static(resolve(__dirname, '..', 'dist-backoffice')));


// app.use('/about', express.static(resolve(__dirname, '..', 'about')));
// todo
app.use('/static', express.static(resolve(__dirname, '..', 'static')));
app.use('/assets', express.static(resolve(__dirname, '..', 'dist', 'assets')));
app.use('/*', express.static(resolve(__dirname, '..', 'dist')));


app.listen(8000, function () {
    console.log('Listening on port 8000 !');
});