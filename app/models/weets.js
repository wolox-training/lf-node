'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Weets extends Model {
    static associate(models) {
      Weets.belongsTo(models.Users, {
        foreignKey: 'userId',
        target_keys: 'id'
      });
      Weets.hasMany(models.Raiting, {
        foreignKey: 'id'
      });
    }
  }
  Weets.init(
    {
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Weets'
    }
  );
  return Weets;
};
