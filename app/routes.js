// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn } = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', signUp);
  app.post('/users/sessions', signIn);
};
