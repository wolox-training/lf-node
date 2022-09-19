const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getAllUsers } = require('./controllers/users');
const { getWeeter } = require('./controllers/weeters');
const { validateCreate } = require('./middlewares/schema_validator');
const { verifyJWT } = require('./middlewares/checkToken');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateCreate, signUp);
  app.post('/users/sessions', signIn);
  app.get('/weets', getWeeter);
  app.get('/allusers', verifyJWT, getAllUsers);
};
