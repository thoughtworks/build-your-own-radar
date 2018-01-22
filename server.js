const express = require('express');
const { resolve } = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

var app = express();


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


app.use('/api', apiRouter);
app.use('/', express.static(resolve(__dirname, 'dist-radar')));


app.listen(8000, function(){
    console.log('Listening on port 8000 !');
});