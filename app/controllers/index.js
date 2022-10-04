const { signUp, signIn, getAllUsers, createAdmin } = require('./users');
const { healthCheck } = require('./healthCheck');
const { createRating } = require('./rating');
const { createWeet, indexWeets } = require('./weets');

module.exports = {
  signUp,
  signIn,
  healthCheck,
  createRating,
  createWeet,
  getAllUsers,
  createAdmin,
  indexWeets
};
