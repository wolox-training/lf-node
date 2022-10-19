'use strict';
module.exports = {
  up: queryInterface => queryInterface.renameTable('Raitings', 'Ratings')
};
