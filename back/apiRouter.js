const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const {resolve} = require('path');

var apiRouter = express.Router();

apiRouter.use(bodyParser.json());

apiRouter.post('/feedback', (req, res) => {
    var msg = req.body.msg || '';
    fs.appendFile('data/feedbacks.txt', `${msg}\n`, (err)=>{
        res.send('Thank you for yousr feed back');
    });
});

apiRouter.get('/feedbacks', (req, res) => {
    res.download('data/feedbacks.txt');
});

apiRouter.get('/data', (req, res)=>{
    fs.readFile('data/data.csv', (err, data)=>{
        res.send(data);
    });
});

module.exports = apiRouter;