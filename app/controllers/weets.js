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
      res.status(HTTP_CODES.INTERNAL_ERROR).json({ message: error.weetCharsMany });
      return;
    }
    const weet = await createWeet(phrase, req.id);
    res.status(HTTP_CODES.CREATED).json({ weet, message: success.created });
  } catch (err) {
    res.status(HTTP_CODES.INTERNAL_ERROR).json({ message: err });
  }
};
