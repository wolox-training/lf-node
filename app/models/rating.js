'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.Users, {
        foreignKey: 'userId',
        target_keys: 'id'
      });
      Rating.belongsTo(models.Weets, {
        foreignKey: 'weetId',
        target_keys: 'id'
      });
    }
  }
  Rating.init(
    {
      weetId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isValue: (value, next) => {
            if (value !== 1 && value !== -1) {
              next(new Error('you need to rate with a valid value'));
            }
            next();
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Rating'
    }
  );
  return Rating;
};
