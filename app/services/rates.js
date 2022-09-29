const { Op } = require('sequelize');
const rating = require('../models/index').Raiting;
const { info } = require('../logger');
const { databaseError } = require('../errors');

exports.createRate = rateParams => {
  info('Calling users.createUser');
  return rating
    .create({
      userId: rateParams.userId,
      weetId: rateParams.weetId,
      score: rateParams.score
    })
    .catch(error => {
      throw databaseError(error.message);
    });
};

exports.findRate = id => {
  info('Calling weets.findWeetById');
  return rating
    .findOne({
      where: {
        [Op.and]: {
          userId: id.userId,
          weetId: id.weetId
        }
      }
    })
    .catch(error => {
      throw databaseError(error.message);
    });
};

exports.updateRate = user => {
  info('Calling weets.updateRate');
  rating.update({ score: user.score }, { where: { userId: user.userId } }).catch(error => {
    info.error(error.message);
    throw databaseError(error.message);
  });
};
