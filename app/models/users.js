'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {}
  Users.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: 'The name can only contain letters'
          },
          len: {
            args: [3, 255],
            msg: 'The name must be between 3 and 255 characters'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: 'The name can only contain letters'
          },
          len: {
            args: [3, 255],
            msg: 'The name must be between 3 and 255 characters'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Email is not valid.'
          },
          is: {
            args: /(wolox)/,
            msg: 'it needs to be a mail from wolox'
          },
          isUnique: (value, next) => {
            Users.findAll({
              where: { email: value },
              attributes: ['id']
            })
              .then(user => {
                if (user.length !== 0) {
                  next(new Error('Email address already in use!'));
                }
                next();
              })
              .catch(onError => console.log(onError));
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 255],
            msg: 'The name must be between 8 and 255 characters'
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Users'
    }
  );
  return Users;
};
