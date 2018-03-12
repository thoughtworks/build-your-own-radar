const jwt = require('jsonwebtoken');


const SECRET = 'stek-stek-secret';
const HEADERKEY = 'x-access-token';

const CRED = {
  username: 'admin',
  password: 'passwod'
};

if(process.env.ENV == 'DEV') {
  CRED.password = 'password';
}

const sign = (obj) => {
  return jwt.sign(obj, SECRET);
};

const signMiddlware = (req, res, next) => {
  let { username, password } = req.body;
  if(username && username === CRED.username && password && password === CRED.password) {
    return res.status(200).send({
      auth: true,
      message: 'auth success',
      token: sign({username})
    });
  }else{
    return res.status(401).send({ auth: false, message: 'incorrect user/pass.' });
  }
};

const verifyMiddleware = ( req, res, next ) => {
  var token = req.headers[HEADERKEY];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    else {
      next();
    }
  });
}

module.exports = {signMiddlware, verifyMiddleware}