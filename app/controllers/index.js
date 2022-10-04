const { signUp, signIn, getAllUsers, createAdmin } = require('./users');
const { invalidateAllUserSessions } = require('./sessions');
const { healthCheck } = require('./healthCheck');
const { createRating } = require('./rating');
const { createWeet, indexWeets } = require('./weets');

module.exports = {
  signUp,
  signIn,
  healthCheck,
  indexWeets,
  getAllUsers,
  createAdmin,
  createWeet,
  createRating,
  invalidateAllUserSessions
};
