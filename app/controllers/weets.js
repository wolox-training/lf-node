const phrases = require('../services/friki_phrases');

exports.getWeet = async (req, res) => {
  const phrase = await phrases.getPhrase();
  console.log(phrase);
  res.status(200).send(phrase);
};
