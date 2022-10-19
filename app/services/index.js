const { createUser, findUser, findAll, updateAdmin, updateUser } = require('./users');
const { createWeet, findAllWeets } = require('./weets');
const { createRate, findRate, updateRate, findWeetsRates, ratePosition } = require('./rates');
const { getPhrase } = require('./friki_phrases');
const { findSession, createSession, invalidateSession, updateSession } = require('./sessions');
const { sendWelcomeMail } = require('./emails');

module.exports = {
  createUser,
  findUser,
  findAll,
  updateAdmin,
  createWeet,
  getPhrase,
  findSession,
  createSession,
  invalidateSession,
  updateSession,
  findAllWeets,
  createRate,
  findRate,
  updateRate,
  findWeetsRates,
  ratePosition,
  updateUser,
  sendWelcomeMail
};
