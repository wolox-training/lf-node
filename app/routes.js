const {
  healthCheck,
  signUp,
  signIn,
  getAllUsers,
  createAdmin,
  createWeet,
  createRating,
  indexWeets,
  invalidateAllUserSessions
} = require('./controllers');
const { validateUser, verifyJWT, validateRole } = require('./middlewares');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', validateUser, signUp);
  app.post('/users/sessions', signIn);
  app.get('/allusers', verifyJWT, getAllUsers);
  app.post('/users/admin', verifyJWT, validateRole, createAdmin);
  app.post('/weets', verifyJWT, createWeet);
  app.post('/weets/:id/ratings', verifyJWT, createRating);
  app.get('/weets', verifyJWT, indexWeets);
  app.post('/users/sessions/invalidate_all', verifyJWT, invalidateAllUserSessions);
};
