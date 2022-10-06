'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('Users', 'position', {
      allowNull: false,
      type: Sequelize.ENUM,
      values: ['DEV', 'LEAD', 'TL', 'EM', 'HEAD', 'CEO'],
      defaultValue: 'DEV'
    }),
  down: queryInterface => Promise.all([queryInterface.removeColumn('Users', 'position')])
};
