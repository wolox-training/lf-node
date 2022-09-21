const weet = require('../models/index').Weets;
const { info } = require('../logger');
const { databaseError } = require('../errors');

exports.createWeet = (content, userId) => {
  info('weets.createWeet: Creating weet');
  return weet.create({ content: content.joke, userId }).catch(error => {
    throw databaseError(error.message);
  });
};
