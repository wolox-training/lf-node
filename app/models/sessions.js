'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sessions extends Model {
    static associate(models) {
      Sessions.belongsTo(models.Users, {
        foreignKey: 'userId',
        target_keys: 'id'
      });
    }
  }
  Sessions.init(
    {
      token: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Sessions'
    }
  );
  return Sessions;
};
