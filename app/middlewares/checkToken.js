const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const HTTP_CODES = require('../../config/codes');
const { error } = require('../../config/messages');

exports.verifyJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.emptyToken });
    return;
  }
  jwt.verify(token.replace('Bearer ', ''), process.env.AUTH_SECRET, err => {
    if (err) {
      res.status(HTTP_CODES.NOT_FOUND).json({ message: error.invalidToken });
      return;
    }
    const decoded = jwt_decode(token);
    req.id = decoded.user.id;
    next();
  });
};