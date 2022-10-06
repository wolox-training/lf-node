const sequelize = require('sequelize');
const rating = require('../models/index').Rating;
const weet = require('../models/index').Weets;
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
      order: [['createdAt', 'DESC']],
      where: {
        [sequelize.Op.and]: {
          userId: id.userId,
          weetId: id.weetId
        }
      }
    })
    .catch(error => {
      throw databaseError(error.message);
    });
};

exports.updateRate = async user => {
  info('Calling weets.updateRate');
  await rating
    .update({ score: user.score }, { where: { userId: user.userId, weetId: user.weetId } })
    .catch(error => {
      throw databaseError(error.message);
    });
};

exports.findWeetsRates = id => {
  info('Calling weets.findWeets');
  return rating
    .findAll({
      attributes: ['weetId', [sequelize.fn('sum', sequelize.col('score')), 'total']],
      where: { weetId: id },
      group: ['weetId'],
      raw: true
    })
    .catch(error => {
      throw databaseError(error.message);
    });
};

exports.ratePosition = weetId =>
  rating
    .findAll({
      include: [
        {
          model: weet,
          where: {
            id: weetId
          },
          attributes: ['userId']
        }
      ],
      where: { weetId },
      attributes: ['weetId', 'userId']
    })
    .then(data => {
      return rating.findAll({
        include: [
          {
            model: weet,
            where: {
              userId: data[0].Weet.userId
            },
            attributes: []
          }
        ],
        attributes: ['Weet.userId',[sequelize.fn('sum', sequelize.col('score')), 'total']],
        group: ['Weet.userId']
      })
    })
    .catch(error => {
      throw databaseError(error.message);
    });
  
