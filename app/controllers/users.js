const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { info } = require('../logger');
const { createUser, findUser, findAll } = require('../services/users');
const HTTP_CODES = require('../../config/codes');
const { success, error } = require('../../config/messages');

exports.signUp = (req, res) => {
  info('Sign-Up');
  createUser(req.body)
    .then(user => {
      const token = jwt.sign({ user }, process.env.AUTH_SECRET, {
        expiresIn: process.env.AUTH_EXPIRES
      });
      res.status(HTTP_CODES.CREATED).json({ message: success.created, token, email: req.body.email });
    })
    .catch(err => {
      res.status(HTTP_CODES.BAD_REQUEST).json(err);
    });
};

exports.signIn = (req, res) => {
  info('Sign-In');
  const { email, password } = req.body;
  findUser(email)
    .then(user => {
      if (!user) {
        res.status(HTTP_CODES.NOT_FOUND).json({ message: error.notFound });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ user }, process.env.AUTH_SECRET, {
          expiresIn: process.env.AUTH_EXPIRES
        });
        res.status(HTTP_CODES.OK).json({ user: user.firstName, token });
        return;
      }
      res.status(HTTP_CODES.UNAUTHORIZED).json({ message: error.wrongPassword });
    })
    .catch(err => {
      res.status(HTTP_CODES.INTERNAL_ERROR).json(err);
    });
};

exports.getAllUsers = (req, res, next) => {
  const { page, limit } = req.query;
  findAll(page, limit)
    .then(users => res.send({ users }))
    .catch(next);
};
