const { validationResult } = require('express-validator');

exports.validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
    return;
  } catch (err) {
    res.status(403);
    res.send({ errors: err.array() });
  }
};
