const { invalidateSession } = require('../services');

exports.invalidateAllUserSessions = async (req, res) => {
  try {
    await invalidateSession(req.id);
    res.status(200).json({ message: 'invalidate' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
