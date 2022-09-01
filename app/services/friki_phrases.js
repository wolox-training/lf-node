const axios = require('axios');

exports.getPhrase = async res => {
  try {
    const apiResponse = await axios.get(process.env.API_URL_PRHASES);
    return apiResponse.data;
  } catch (error) {
    console.error(error);
    res.status(500).send('error getting a weet');
    return error;
  }
};
