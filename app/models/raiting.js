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
      score: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Raiting'
    }
  );
  return Raiting;
};
