const { hash } = require('bcrypt');
const rounds = require('../../config').common.session;

exports.hashPassword = password => hash(password, rounds.saltrounds);
