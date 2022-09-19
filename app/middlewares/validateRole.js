const jwt_decode = require('jwt-decode');
const { error } = require('../../config/messages');
const HTTP_CODES = require('../../config/codes');

exports.validateRole = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  const decoded = jwt_decode(token);
  console.log('hola', decoded);
  if (decoded.user.role !== 'admin') {
    res.status(HTTP_CODES.UNAUTHORIZED).json({ message: error.notAdmin });
    return;
  }
  next();
};
