const { createWeet, getPhrase, findAllWeets } = require('../services');
const { HTTP_CODES, success, error } = require('../../config');
const { info } = require('../logger');

exports.createWeet = async (req, res) => {
  try {
    info('weets.createWeet');
    const phrase = await getPhrase();
    const cutphrase = phrase.joke.substring(0, 140);
    const weet = await createWeet(cutphrase, req.id);
    return res.status(HTTP_CODES.CREATED).json({ weet, message: success.created });
  } catch (err) {
    info('weets.createWeet error');
    return res.status(HTTP_CODES.INTERNAL_ERROR).json({ message: error.weetNotCreated });
  }
};

exports.indexWeets = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const weets = await findAllWeets(page, limit);
    return res.status(HTTP_CODES.SUCCESS).send({ weets });
  } catch (err) {
    return res.status(HTTP_CODES.INTERNAL_ERROR).json({ message: error.errorGettingWeet });
  }
};
