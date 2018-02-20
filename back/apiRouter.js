const { resolve } = require('path');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const authMid = require('./auth');
const os = require('os');
const technologiesRouter = require('./technologies-routes');

var apiRouter = express.Router();

const FEEDBACKSDATAFILENAME = 'data/feedbacks.txt';

apiRouter.use(bodyParser.json());
apiRouter.use('/feedbacks', authMid);
apiRouter.post('/feedback', (req, res) => {
    var msg = req.body.msg || '';
    fs.appendFile(FEEDBACKSDATAFILENAME, `${msg}\n`, (err) => {
        res.send('Thank you for yousr feed back');
    });
});

apiRouter.get('/feedbacks', (req, res) => {
    res.download(FEEDBACKSDATAFILENAME);
});
apiRouter.get('/about-content', (req, res) => {
    res.sendFile(resolve('about', 'index.html'));
});
apiRouter.get('/feedbacks-json', (req, res) => {
    fs.readFile(FEEDBACKSDATAFILENAME, "utf8", (err, fileContent) => {
        res.json(fileContent.trim().split(os.EOL));
    });
    // res.download(FEEDBACKSDATAFILENAME);
});

// apiRouter.get('/data', (req, res) => {
//     fs.readFile('data/data.csv', (err, data) => {
//         res.send(data);
//     });
// });

apiRouter.use('/technologies', technologiesRouter)


module.exports = apiRouter;