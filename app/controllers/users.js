const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { info } = require('../logger');
const { createUser, findUser } = require('../services/users');
const HTTP_CODES = require('../../config/codes');

exports.signUp = (req, res) => {
  info('Sign-Up');
  if (req.body.password.length < 8) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: 'Password must be 8 characters or more' });
    return;
  }
  createUser(req.body)
    .then(user => {
      const token = jwt.sign({ user }, process.env.AUTH_SECRET, {
        expiresIn: process.env.AUTH_EXPIRES
      });
      res.status(HTTP_CODES.CREATED).json({ message: 'User was created', token, user: req.body.firstname });
    })
    .catch(error => {
      res.status(HTTP_CODES.BAD_REQUEST).json(error);
    });
};

exports.signIn = (req, res) => {
  info('Sign-In');
  findUser(req.body.mail)
    .then(user => {
      if (!user) {
        res.status(HTTP_CODES.NOT_FOUND).json({ message: 'user not found' });
        return;
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ user }, process.env.AUTH_SECRET, {
          expiresIn: process.env.AUTH_EXPIRES
        });
        res.json({ user, token });
        return;
      }
      res.status(HTTP_CODES.UNAUTHORIZED).json({ message: 'Incorrect Password' });
    })
    .catch(err => {
      res.status(HTTP_CODES.INTERNAL_ERROR).json(err);
    });
};
