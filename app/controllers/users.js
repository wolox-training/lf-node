const bcrypt = require('bcrypt');
const { createUser } = require('../services/users');

const saltRounds = 10;

exports.signUp = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    createUser({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      password: hash,
      email: req.body.mail
    })
      .then(() => {
        res.status(201).send('User was created');
      })
      .catch(error => {
        res.status(400).json(error);
      });
  });
};
