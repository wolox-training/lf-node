const { getPhrase } = require('../services/friki_phrases');
const { createWeet } = require('../services/weets');
const HTTP_CODES = require('../../config/codes');
const { success, error } = require('../../config/messages');

exports.getWeet = async (req, res) => {
  const phrase = await getPhrase();
  console.log(phrase);
  res.status(HTTP_CODES.OK).send(phrase);
};

exports.createWeet = async (req, res) => {
  try {
    const phrase = await getPhrase();
    if (phrase.joke.length > 140) {
      return res.status(HTTP_CODES.INTERNAL_ERROR).json({ message: error.weetCharsMany });
    }
    const weet = await createWeet(phrase, req.id);
    return res.status(HTTP_CODES.CREATED).json({ weet, message: success.created });
  } catch (err) {
    return res.status(HTTP_CODES.INTERNAL_ERROR).json({ message: err });
  }
};
