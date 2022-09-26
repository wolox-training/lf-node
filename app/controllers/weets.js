const { getPhrase } = require('../services/friki_phrases');
const { createWeet } = require('../services/weets');
const HTTP_CODES = require('../../config/codes');
const { success } = require('../../config/messages');

exports.getWeet = async (req, res) => {
  const phrase = await getPhrase();
  console.log(phrase);
  res.status(HTTP_CODES.OK).send(phrase);
};

exports.createWeet = async (req, res) => {
  try {
    const phrase = await getPhrase();
    const weet = await createWeet(phrase, req.id);
    if (weet) {
      return res.status(HTTP_CODES.CREATED).json({ weet, message: success.created });
    }
    return res.status(HTTP_CODES.CREATED).json({ weet, message: 'weet no creado' });
  } catch (err) {
    return res.status(HTTP_CODES.INTERNAL_ERROR).json({ message: err });
  }
};
