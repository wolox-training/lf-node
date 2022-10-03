const sessions = require('../models/index').Sessions;
const { info } = require('../logger');
const { databaseError } = require('../errors');

exports.findSession = userData => {
  info(`Calling users.CreateSession for user ${userData}`);
  return sessions.findOne({ where: { userId: userData } }).catch(error => {
    throw databaseError(error.message);
  });
};

exports.createSession = (id, token) => {
  info(`Calling users.CreateSession for user ${id}`);
  return sessions.create({ userId: id, token }).catch(error => {
    throw databaseError(error.message);
  });
};

exports.invalidateSession = id => {
  info(`Calling users.invalidateSession for user ${id}`);
  return sessions.destroy({ where: { userId: id } }).catch(error => {
    throw databaseError(error.message);
  });
};

exports.updateSession = (id, token) => {
  sessions.update({ token }, { where: { userId: id } }).catch(error => {
    info.error(error.message);
    throw databaseError(error.message);
  });
};
