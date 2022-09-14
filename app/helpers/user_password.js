const { hash, compareSync } = require('bcrypt');
const rounds = require('../../config').common.session;

exports.hashPassword = password => hash(password, rounds.saltrounds);
exports.compareSync = (password, hashing) => compareSync(password, hashing);
