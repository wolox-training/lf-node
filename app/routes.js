const {
  healthCheck,
  signUp,
  signIn,
  getAllUsers,
  createAdmin,
} = require('./controllers');
const { verifyJWT, validateRole } = require('./middlewares');


exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateCreate, signUp);
  app.post('/users/sessions', signIn);
  app.get('/weets', getWeeter);
  app.get('/allusers', verifyJWT, getAllUsers);
  app.post('/users/admin', verifyJWT, validateRole, createAdmin);
};
