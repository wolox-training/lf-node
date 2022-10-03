const { createUser, findUser, findAll, updateAdmin } = require('./users');
const { createWeet, findAllWeets } = require('./weets');
const { getPhrase } = require('./friki_phrases');

module.exports = { createUser, findUser, findAll, updateAdmin, createWeet, getPhrase, findAllWeets };
