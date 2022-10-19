const { createRate, findRate, ratePosition, updateUser } = require('../services');
const { HTTP_CODES, success, error } = require('../../config');
const { positionCalculate } = require('../helpers/Position');

exports.createRating = async (req, res) => {
  try {
    const request = { weetId: req.params.id, userId: req.id };
    const qualify = req.body;
    if (!qualify.score) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.rateNotSend });
    }
    const rate = await findRate(request);
    const rateObject = Object.assign(request, qualify);
    if (!rate) {
      await createRate(rateObject);
      const position = await ratePosition(req.params.id);
      const calc = positionCalculate(position[0].total);
      updateUser(calc, position[0].userId);
      return res
        .status(HTTP_CODES.CREATED)
        .json({ message: success.created, rate: rateObject, position, calc });
    }
    if (rate.dataValues.score !== qualify.score) {
      await createRate(rateObject);
      const positionUpdate = await ratePosition(req.params.id);
      const positionCalc = positionCalculate(positionUpdate[0].total);
      updateUser(positionCalc, positionUpdate[0].userId);
      return res.status(HTTP_CODES.CREATED).json({ message: success.updated, positionUpdate, positionCalc });
    }
    return res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.sameRate });
  } catch {
    return res.status(HTTP_CODES.INTERNAL_ERROR).json({ message: error.rateNotFound });
  }
};
