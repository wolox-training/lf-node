const { validationResult } = require('express-validator');

exports.validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
    return;
  } catch (err) {
    res.status(400);
    res.json({ message: err.array() });
  }
};
