const jwt = require('jsonwebtoken');
const { error } = require('../../config/messages');
const HTTP_CODES = require('../../config/codes');

exports.validateRole = (req, res, next) => {
  const token = req.headers.authorization;
  const decoded = jwt.decode(token);
  if (decoded.user.role !== 'admin') {
    return res.status(HTTP_CODES.UNAUTHORIZED).json({ message: error.notAdmin });
  }
  return next();
};
