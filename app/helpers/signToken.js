const jwt = require('jsonwebtoken');

exports.signToken = (id, email) =>
  jwt.sign({ user: { id, email } }, process.env.AUTH_SECRET, {
    expiresIn: process.env.AUTH_EXPIRES
  });
