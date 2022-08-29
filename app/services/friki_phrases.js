const axios = require('axios');

exports.getPhrase = async () => {
  try {
    const data = await axios.get('https://geek-jokes.sameerkumar.website/api?format=json');
    return data.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
