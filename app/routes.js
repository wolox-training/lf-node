const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn } = require('./controllers/users');
const { getWeeter } = require('./controllers/weeters');
const { validateCreate } = require('./middlewares/schema_validator');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateCreate, signUp);
  app.post('/users/sessions', signIn);
  app.get('/weets', getWeeter);
};
