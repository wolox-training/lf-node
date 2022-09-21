const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getAllUsers, createAdmin } = require('./controllers/users');
const { getWeeter, createWeet } = require('./controllers/weets');
const { validateUser } = require('./middlewares/schema_validator');
const { verifyJWT } = require('./middlewares/checkToken');
const { validateRole } = require('./middlewares/validateRole');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateUser, signUp);
  app.post('/users/sessions', signIn);
  app.get('/weets', getWeeter);
  app.get('/allusers', verifyJWT, getAllUsers);
  app.post('/users/admin', verifyJWT, validateRole, createAdmin);
  app.post('/weets', verifyJWT, createWeet);
};
