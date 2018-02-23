const { resolve } = require('path');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const { verifyMiddleware, signMiddlware } = require('./auth');
const os = require('os');
const technologiesRouter = require('./technologies-routes');

var apiRouter = express.Router();

const FEEDBACKSDATAFILENAME = 'data/feedbacks.txt';

apiRouter.use(bodyParser.json());
// apiRouter.use('/feedbacks', verifyMiddleware);
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
apiRouter.get('/feedbacks-json', verifyMiddleware, (req, res) => {
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

apiRouter.use('/technologies', technologiesRouter);

apiRouter.post('/login', signMiddlware);

module.exports = apiRouter;