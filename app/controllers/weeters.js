const phrases = require('../services/friki_phrases');

exports.getWeeter = async (req, res) => {
  const phrase = await phrases.getPhrase();
  console.log(phrase);
  res.status(200);
  res.send(phrase);
};
