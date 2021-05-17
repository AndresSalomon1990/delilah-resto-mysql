const jwt = require('jsonwebtoken');
const sign = 'Mi_firma';

module.exports.sign = (data) => {
  return jwt.sign(data, sign);
};

const decode = (token) => {
  return jwt.verify(token, sign);
};

module.exports.verifyUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const tokenDecoded = decode(token, sign);
    if (tokenDecoded) {
      req.user = tokenDecoded; // send the user object with data in the token
      next();
    }
  } else {
    res.status(400).json({ message: 'No se ha identificado un token.' })
    return false;
  }
};