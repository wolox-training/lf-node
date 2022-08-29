// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { getWeeter } = require('./controllers/weeters');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/weets', getWeeter);
};
