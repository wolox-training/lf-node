const { createWeet, getPhrase } = require('../services');
const { HTTP_CODES, success, error } = require('../../config');
const { info } = require('../logger');

exports.getWeet = async (req, res) => {
  info('weets.getWeet');
  const phrase = await getPhrase();
  console.log(phrase);
  res.status(HTTP_CODES.SUCCESS).send(phrase);
};

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
