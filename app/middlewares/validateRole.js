const { HTTP_CODES, error } = require('../../config');
const { findUser } = require('../services');

exports.validateRole = async (req, res, next) => {
  const userAdmin = await findUser(req.email);
  if (userAdmin.dataValues.role !== 'admin') {
    res.status(HTTP_CODES.UNAUTHORIZED).json({ message: error.notAdmin });
    return;
  }
  next();
};
