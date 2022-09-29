'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Raiting extends Model {
    static associate(models) {
      Raiting.belongsTo(models.Users, {
        foreignKey: 'userId',
        target_keys: 'id'
      });
      Raiting.belongsTo(models.Weets, {
        foreignKey: 'weetId',
        target_keys: 'id'
      });
    }
  }
  Raiting.init(
    {
      weetId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isValue: (value, next) => {
            if (value !== 1 && value !== -1) {
              next(new Error('Email address already in use!'));
            }
            next();
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Raiting'
    }
  );
  return Raiting;
};
