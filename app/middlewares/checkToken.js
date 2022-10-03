const jwt = require('jsonwebtoken');
const { HTTP_CODES, error } = require('../../config');
const { findSession } = require('../services');

exports.verifyJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.emptyToken });
  }
  const cleanToken = token.replace('Bearer ', '');
  return jwt.verify(cleanToken, process.env.AUTH_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(HTTP_CODES.NOT_FOUND).json({ message: error.invalidToken });
    }
    const Session = await findSession(decoded.user.id);
    if (!Session) {
      return res.status(HTTP_CODES.INTERNAL_ERROR).json({ message: error.sessionNotExist });
    }
    if (Session.dataValues.token !== cleanToken) {
      return res.status(HTTP_CODES.NOT_FOUND).json({ message: error.invalidToken });
    }
    req.id = decoded.user.id;
    req.email = decoded.user.email;
    return next();
  });
};
