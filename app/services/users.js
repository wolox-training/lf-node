const user = require('../models/index').Users;
const { info } = require('../logger');
const { databaseError } = require('../errors');
const { pagParams } = require('../helpers/pagination');
const hashpass = require('../helpers/user_password').hashPassword;

exports.createUser = async userParams => {
  info('Calling users.createUser');
  return user
    .create({
      firstName: userParams.firstName,
      lastName: userParams.lastName,
      email: userParams.email,
      password: await hashpass(userParams.password),
      role: userParams.role
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
    .findAll({ ...pagParams(page, limit), attributes: ['id', 'firstName', 'lastName', 'email'] })
    .catch(error => {
      info.error(error.message);
      throw databaseError(error.message);
    });

exports.updateAdmin = user_id =>
  user.update({ role: 'admin' }, { where: { id: user_id } }).catch(error => {
    info.error(error.message);
    throw databaseError(error.message);
  });

exports.updateUser = (newPosition, user_id) =>
  user.update({ position: newPosition }, { where: { id: user_id } }).catch(error => {
    info.error(error.message);
    throw databaseError(error.message);
  });
