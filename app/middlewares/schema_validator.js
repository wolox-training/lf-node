const { check } = require('express-validator');
const { validateResult } = require('../helpers/validate');
const { userNotOk } = require('../../config/messages');

exports.validateCreate = [
  check('firstName')
    .exists()
    .not()
    .isEmpty()
    .withMessage(userNotOk.empty)
    .isAlphanumeric()
    .isLength({ min: 3 })
    .withMessage(userNotOk.nameCharsMissing),
  check('lastName')
    .exists()
    .not()
    .isEmpty()
    .withMessage(userNotOk.empty)
    .isAlphanumeric()
    .isLength({ min: 3 })
    .withMessage(userNotOk.nameCharsMissing),
  check('email')
    .exists()
    .not()
    .isEmpty()
    .withMessage(userNotOk.empty)
    .isEmail()
    .withMessage(userNotOk.invalidEmail)
    .matches(/(wolox)/)
    .withMessage(userNotOk.notWoloxEmail),
  check('password')
    .exists()
    .not()
    .isEmpty()
    .withMessage(userNotOk.empty)
    .isAlphanumeric()
    .isLength({ min: 8 })
    .withMessage(userNotOk.passwordCharsMissing),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];
