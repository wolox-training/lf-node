const {
  healthCheck,
  signUp,
  signIn,
  getAllUsers,
  createAdmin,
  getWeet,
  createWeet,
  createRating
} = require('./controllers');
const { validateUser, verifyJWT, validateRole } = require('./middlewares');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateUser, signUp);
  app.post('/users/sessions', signIn);
  app.get('/weets', getWeet);
  app.get('/allusers', verifyJWT, getAllUsers);
  app.post('/users/admin', verifyJWT, validateRole, createAdmin);
  app.post('/weets', verifyJWT, createWeet);
  app.post('/weets/:id/ratings', verifyJWT, createRating);
};
