const bcrypt = require('bcrypt');
const { info } = require('../logger');
const {
  createUser,
  findUser,
  findAll,
  updateAdmin,
  findSession,
  createSession,
  updateSession,
  sendMail
} = require('../services');
const { HTTP_CODES, success, error } = require('../../config');
const { signToken } = require('../helpers/signToken');

exports.signUp = async (req, res) => {
  info('users.Sign-Up');
  try {
    const user = await createUser(req.body);
    const infoEmail = await sendMail(user);
    res.status(HTTP_CODES.CREATED).json({ message: success.created, email: req.body.email, infoEmail });
  } catch (err) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: err });
  }
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
      const token = signToken(user.dataValues.id, user.dataValues.email);
      if (!userSession) {
        await createSession(user.dataValues.id, token);
        return res.status(HTTP_CODES.SUCCESS).json({ user: user.dataValues.firstName, token });
      }
      updateSession(user.dataValues.id, token);
      return res
        .status(HTTP_CODES.SUCCESS)
        .json({ user: user.dataValues.firstName, token, message: success.updated });
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

exports.getAllUsers = (req, res, next) => {
  const { page, limit } = req.query;
  findAll(page, limit)
    .then(users => res.send({ users }))
    .catch(next);
};
