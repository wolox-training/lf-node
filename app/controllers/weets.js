const { getPhrase } = require('../services/friki_phrases');
const { createWeet } = require('../services/weets');

exports.getWeeter = async (req, res) => {
  const phrase = await getPhrase();
  console.log(phrase);
  res.status(200).send(phrase);
};

exports.createWeet = async (req, res) => {
  try {
    const phrase = await getPhrase();
    if (phrase.joke.length > 140) {
      res.status(500).json({ message: 'error' });
      return;
    }
    const weet = await createWeet(phrase, req.id);
    res.status(201).json({ weet });
  } catch (err) {
    res.status(500).json({ message: 'error 2' });
  }
};
