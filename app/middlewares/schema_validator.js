const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

exports.validateCreate = [
  check('firstName')
    .exists()
    .not()
    .isEmpty()
    .withMessage('The firstName field cannot be empty')
    .isAlphanumeric()
    .isLength({ min: 3 })
    .withMessage('must be at least 3 chars long'),
  check('lastName')
    .exists()
    .not()
    .isEmpty()
    .withMessage('The lastName field cannot be empty')
    .isAlphanumeric()
    .isLength({ min: 3 })
    .withMessage('must be at least 3 chars long'),
  check('email')
    .exists()
    .not()
    .isEmpty()
    .withMessage('The email field cannot be empty')
    .isEmail()
    .withMessage('that is not a valid email')
    .matches(/(wolox)/)
    .withMessage('it needs to be a mail from wolox'),
  check('password')
    .exists()
    .not()
    .isEmpty()
    .withMessage('The password field cannot be empty')
    .isAlphanumeric()
    .isLength({ min: 8 })
    .withMessage('must be at least 8 chars long'),
  (req, res, next) => {
    validateResult(req, res, next);
  }
];
