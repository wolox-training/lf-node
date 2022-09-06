const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn } = require('./controllers/users');
const { getWeeter } = require('./controllers/weeters');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', signUp);
  app.post('/users/sessions', signIn);
  app.get('/weets', getWeeter);
};
