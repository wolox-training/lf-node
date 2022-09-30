const jwt = require('jsonwebtoken');
const { HTTP_CODES, error } = require('../../config');
const { findSession, invalidateSession } = require('../services');

exports.verifyJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    console.log('hola non token');
    return res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.emptyToken });
  }
  const cleanToken = token.replace('Bearer ', '');
  console.log(cleanToken);
  return jwt.verify(cleanToken, process.env.AUTH_SECRET, async (err, decoded) => {
    console.log(decoded);
    const Session = await findSession(decoded.user.id);
    console.log('hola fail session');
    if (Session.dataValues.token !== cleanToken) {
      console.log('hola non equal');
      return res.status(HTTP_CODES.NOT_FOUND).json({ message: error.invalidToken });
    }
    if (err) {
      console.log('hola invalidate');
      invalidateSession(decoded.user.id);
      return res.status(HTTP_CODES.NOT_FOUND).json({ message: error.invalidToken });
    }
    req.id = decoded.user.id;
    console.log(req.id);
    return next();
  });
};
// chequear que el token que veine sea valido y que sea el mismo de la base de datos

// si esta expirado update
