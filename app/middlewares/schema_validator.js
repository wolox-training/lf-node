const { check } = require('express-validator');
const { validateResult } = require('../helpers/validate');
const { error } = require('../../config/messages');

exports.validateCreate = [
  check('firstName')
    .exists()
    .not()
    .isEmpty()
    .withMessage(error.empty)
    .isAlphanumeric()
    .isLength({ min: 3 })
    .withMessage(error.nameCharsMissing),
  check('lastName')
    .exists()
    .not()
    .isEmpty()
    .withMessage(error.empty)
    .isAlphanumeric()
    .isLength({ min: 3 })
    .withMessage(error.nameCharsMissing),
  check('email')
    .exists()
    .not()
    .isEmpty()
    .withMessage(error.empty)
    .isEmail()
    .withMessage(error.invalidEmail)
    .matches(/(@wolox.com)/)
    .withMessage(error.notWoloxEmail),
  check('password')
    .exists()
    .not()
    .isEmpty()
    .withMessage(error.empty)
    .isAlphanumeric()
    .isLength({ min: 8 })
    .withMessage(error.passwordCharsMissing),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];
