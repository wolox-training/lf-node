const { createRate, findRate, ratePosition } = require('../services');
const { HTTP_CODES, success, error } = require('../../config');
const { positionCalculate } = require('../helpers/Position');

exports.createRating = async (req, res) => {
  try {
    // TODO: ACumular el score total de los weets del usuario para asi restarle 1
    // TODO: Crear un nuevo registro en la tabla raiting ewn ccaso de una nueva califaición añadir validación

    console.log('userid', req.id);
    console.log('weetid', req.params.id);
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
      const calc = positionCalculate(position[0].dataValues.total);
      // await updateUser()
      return res
        .status(HTTP_CODES.CREATED)
        .json({ message: success.created, rate: rateObject, position, calc });
    }
    if (rate.dataValues.score !== qualify.score) {
      await createRate(rateObject);
      const positionUpdate = await ratePosition(req.params.id);
      // const calcUpdate = positionCalculate(positionUpdate[0].dataValues.total)
      console.log(positionUpdate);
      // await updateUser()
      return res.status(HTTP_CODES.CREATED).json({ message: success.updated, positionUpdate });
    }
    return res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.sameRate });
  } catch {
    return res.status(HTTP_CODES.INTERNAL_ERROR).json({ message: error.rateNotFound });
  }
};
