const { createUser, findUser, findAll, updateAdmin } = require('./users');
const { createWeet, findAllWeets } = require('./weets');
const { getPhrase } = require('./friki_phrases');
const { findSession, createSession, invalidateSession, updateSession } = require('./sessions');

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
  findAllWeets
};
