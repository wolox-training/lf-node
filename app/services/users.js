const user = require('../models/index').Users;
const { info } = require('../logger');
const { databaseError } = require('../errors');

exports.createUser = userParams => {
  info('Calling users.createUser');
  return user.create(userParams).catch(error => {
    throw databaseError(error.message);
  });
};
