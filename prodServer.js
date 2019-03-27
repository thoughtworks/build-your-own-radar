var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.redirect(302, 'https://tech-radar.getyourguide.com');
});

app.listen(3000);
console.log("App listening on 3000 ", Date());