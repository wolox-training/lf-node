const weet = require('../models/index').Weets;
const { info } = require('../logger');
const { databaseError } = require('../errors');
const { pagParams } = require('../helpers/pagination');

exports.createWeet = (content, userId) => {
  info('weets.createWeet: Creating weet');
  return weet.create({ content, userId }).catch(error => {
    throw databaseError(error.message);
  });
};

exports.findAllWeets = (page = 1, limit = 5) =>
  weet.findAll({ ...pagParams(page, limit), attributes: ['id', 'content', 'userId'] }).catch(error => {
    info.error(error.message);
    throw databaseError(error.message);
  });
