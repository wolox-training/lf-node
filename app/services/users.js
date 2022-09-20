const user = require('../models/index').Users;
const { info } = require('../logger');
const { databaseError } = require('../errors');
const { pag_params } = require('../helpers/pagination');
const hashpass = require('../helpers/user_password').hashPassword;

exports.createUser = async userParams => {
  info('Calling users.createUser');
  return user
    .create({
      firstName: userParams.firstName,
      lastName: userParams.lastName,
      email: userParams.email,
      password: await hashpass(userParams.password)
    })
    .catch(error => {
      throw databaseError(error.message);
    });
};

exports.findUser = emailfind => {
  info('Calling users.createUser');
  return user.findOne({ where: { email: emailfind } }).catch(error => {
    throw databaseError(error.message);
  });
};
exports.findAll = (page = 1, limit = 10) =>
  user
    .findAll({ ...pag_params(page, limit), attributes: ['id', 'firstName', 'lastName', 'email'] })
    .catch(error => {
      info.error(error.message);
      throw databaseError(error.message);
    });
