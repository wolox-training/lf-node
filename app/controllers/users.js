const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { info } = require('../logger');
const { createUser, findUser } = require('../services/users');
const HTTP_CODES = require('../../config/codes');
const rounds = require('../../config').common.session;

exports.signUp = (req, res) => {
  info('Sign-Up');
  bcrypt.hash(req.body.password, rounds.saltrounds, (err, hash) => {
    createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash,
      email: req.body.email
    })
      .then(user => {
        const token = jwt.sign({ user }, process.env.AUTH_SECRET, {
          expiresIn: process.env.AUTH_EXPIRES
        });
        res.status(HTTP_CODES.CREATED).json({ msg: 'User was created', token, user: req.body.firstname });
      })
      .catch(error => {
        res.status(HTTP_CODES.BAD_REQUEST).json(error);
      });
  });
};

exports.signIn = (req, res) => {
  info('Sign-In');
  findUser(req.body.mail)
    .then(user => {
      console.log('hola3', user);
      if (!user) {
        res.status(HTTP_CODES.NOT_FOUND).json({ msg: 'user not found' });
        return;
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ user }, process.env.AUTH_SECRET, {
          expiresIn: process.env.AUTH_EXPIRES
        });
        res.json({ user, token });
        return;
      }
      res.status(HTTP_CODES.UNAUTHORIZED).json({ msg: 'Incorrect Password' });
    })
    .catch(err => {
      res.status(HTTP_CODES.INTERNAL_ERROR).json(err);
    });
};
