const jwt = require('jsonwebtoken');
const { HTTP_CODES, error } = require('../../config');

exports.verifyJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.emptyToken });
  }
  return jwt.verify(token.replace('Bearer ', ''), process.env.AUTH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(HTTP_CODES.NOT_FOUND).json({ message: error.invalidToken });
    }
    req.id = decoded.user.id;
    return next();
  });
};
