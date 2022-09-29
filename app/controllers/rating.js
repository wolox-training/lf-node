const { createRate, findRate, updateRate } = require('../services/rates');
const { HTTP_CODES, success } = require('../../config');

exports.createRating = async (req, res) => {
  try {
    const request = { weetId: req.params.id, userId: req.id };
    const qualify = req.body;
    const rate = await findRate(request);
    const rateObject = Object.assign(request, qualify);
    if (!rate) {
      createRate(rateObject);
      return res.status(HTTP_CODES.CREATED).json({ message: success.created, rate: rateObject });
    }
    updateRate(rateObject);
    return res.status(HTTP_CODES.CREATED).json({ message: success.updated });
  } catch {
    return res.status(HTTP_CODES.INTERNAL_ERROR).json({ message: 'user not found' });
  }
};
