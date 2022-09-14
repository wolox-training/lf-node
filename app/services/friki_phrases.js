const axios = require('axios');
const { weetNotOk } = require('../../config/messages');

exports.getPhrase = async res => {
  try {
    const apiResponse = await axios.get(process.env.API_URL_PRHASES);
    return apiResponse.data;
  } catch (error) {
    console.error(error);
    res.status(500).send(weetNotOk.errorGetting);
    return error;
  }
};
