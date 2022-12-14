const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.MISSING_REQUIRED_PARAMS = 'missing_required_params';
exports.missingRequiredParams = message => internalError(message, exports.MISSING_REQUIRED_PARAMS);
