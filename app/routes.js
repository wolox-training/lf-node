const { healthCheck } = require('./controllers/healthCheck');
const { signUp, signIn, getAllUsers, createAdmin } = require('./controllers/users');
const { getWeeter } = require('./controllers/weeters');
const { validateCreate } = require('./middlewares/schema_validator');
const { verifyJWT } = require('./middlewares/checkToken');
const { validateRole } = require('./middlewares/validateRole');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateCreate, signUp);
  app.post('/users/sessions', signIn);
  app.get('/weets', getWeeter);
  app.get('/allusers', verifyJWT, getAllUsers);
  app.post('/users/admin', verifyJWT, validateRole, createAdmin);
};
