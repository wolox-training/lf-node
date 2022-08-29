const supertest = require('supertest');
const app = require('../app');
// const User = require('../app/models').users;
const api = supertest(app);

it('With valid params, it creates a User', async () => {
  await api
    .post('/users')
    .send({
      firstName: 'Test',
      lastName: 'McTesting',
      email: 'test@wolox.com.ar',
      password: '12345678'
    })
    .expect(201);
});
