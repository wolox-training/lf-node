const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { info } = require('../logger');
const { createUser, findUser } = require('../services/users');
const HTTP_CODES = require('../../config/codes');
const { userOk, userNotOk } = require('../../config/messages');

exports.signUp = (req, res) => {
  info('Sign-Up');
  createUser(req.body)
    .then(user => {
      const token = jwt.sign({ user }, process.env.AUTH_SECRET, {
        expiresIn: process.env.AUTH_EXPIRES
      });
      res.status(HTTP_CODES.CREATED).json({ message: userOk.created, token, email: req.body.email });
    })
    .catch(error => {
      res.status(HTTP_CODES.BAD_REQUEST).json(error);
    });
};

exports.signIn = (req, res) => {
  info('Sign-In');
  const { email, password } = req.body;
  findUser(email)
    .then(user => {
      if (!user) {
        res.status(HTTP_CODES.NOT_FOUND).json({ message: userNotOk.notFound });
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ user }, process.env.AUTH_SECRET, {
          expiresIn: process.env.AUTH_EXPIRES
        });
        res.status(HTTP_CODES.OK).json({ user: user.firstName, token });
        return;
      }
      res.status(HTTP_CODES.UNAUTHORIZED).json({ message: userNotOk.wrongPassword });
    })
    .catch(err => {
      res.status(HTTP_CODES.INTERNAL_ERROR).json(err);
    });
};
