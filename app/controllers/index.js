const { signUp, signIn, getAllUsers, createAdmin } = require('./users');
const { healthCheck } = require('./healthCheck');
const { getWeeter } = require('./weets');

module.exports = { signUp, signIn, healthCheck, getAllUsers, createAdmin, getWeeter };
