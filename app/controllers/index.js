const { signUp, signIn, getAllUsers, createAdmin } = require('./users');
const { healthCheck } = require('./healthCheck');
const { getWeet, createWeet } = require('./weets');

module.exports = { signUp, signIn, healthCheck, getAllUsers, createAdmin, getWeet, createWeet };
