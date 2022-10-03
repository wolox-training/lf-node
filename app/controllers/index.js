const { signUp, signIn, getAllUsers, createAdmin } = require('./users');
const { healthCheck } = require('./healthCheck');
const { createRating } = require('./rating');
const { getWeet, createWeet, indexWeets } = require('./weets');

module.exports = {
  signUp,
  signIn,
  healthCheck,
  createRating,
  getWeet,
  createWeet,
  getAllUsers,
  createAdmin,
  indexWeets
};
