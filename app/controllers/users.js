const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { info } = require('../logger');
const {
  createUser,
  findUser,
  findAll,
  updateAdmin,
  findSession,
  createSession,
  updateSession
} = require('../services');
const { HTTP_CODES, success, error } = require('../../config');
const { signToken } = require('../helpers/signToken');

exports.signUp = (req, res) => {
  info('users.Sign-Up');
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

exports.signIn = async (req, res) => {
  info('users.Sign-In');
  const { email, password } = req.body;
  try {
    const user = await findUser(email);

    if (!user) {
      return res.status(HTTP_CODES.NOT_FOUND).json({ message: error.notFound });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const userSession = await findSession(user.dataValues.id);

      if (!userSession) {
        const token = await signToken(user.dataValues.id, user.dataValues.email);
        await createSession(user.dataValues.id, token);
        return res.status(HTTP_CODES.SUCCESS).json({ user: user.dataValues.firstName, token });
      }
      const newToken = await signToken(user.dataValues.id, user.dataValues.email);
      await updateSession(user.dataValues.id, newToken);
      return res
        .status(HTTP_CODES.SUCCESS)
        .json({ user: user.dataValues.firstName, token: newToken, message: success.updated });
    }
    return res.status(HTTP_CODES.UNAUTHORIZED).json({ message: error.notFound });
  } catch (err) {
    return res.status(HTTP_CODES.INTERNAL_ERROR).json(err);
  }
};

exports.getAllUsers = (req, res, next) => {
  info('users.getAllUsers');
  const { page, limit } = req.query;
  return findAll(page, limit)
    .then(users => res.send({ users }))
    .catch(next);
};

exports.createAdmin = async (req, res) => {
  info('users.createAdmin');
  const userParams = req.body;
  try {
    const user = await findUser(userParams.email);
    if (!user) {
      userParams.role = 'admin';
      await createUser(userParams);
      return res.status(HTTP_CODES.CREATED).json({ message: success.created });
    }
    await updateAdmin(user.dataValues.id);
    return res.status(HTTP_CODES.CREATED).json({ message: success.updated });
  } catch (err) {
    return res.status(HTTP_CODES.INTERNAL_ERROR).json(err);
  }
};
