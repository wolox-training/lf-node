const axios = require('axios');
const { error } = require('../../config');

exports.getPhrase = async res => {
  try {
    const apiResponse = await axios.get(process.env.API_URL_PRHASES);
    return apiResponse.data;
  } catch (err) {
    res.status(500).send(error.errorGetting);
    return err;
  }
};
