const { invalidateSession } = require('../services');
const { HTTP_CODES, success } = require('../../config');

exports.invalidateAllUserSessions = async (req, res) => {
  try {
    await invalidateSession(req.id);
    res.status(HTTP_CODES.SUCCESS).json({ message: success.invalidate });
  } catch (err) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: err });
  }
};
