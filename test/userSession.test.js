const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const userFactory = require('./factory/userFactory');
const sessionFactory = require('./factory/sessionFactory');

describe('POST /users', () => {
  it('responds with a error status code when I try to get a list of users with an invalid token', async () => {
    const user = await userFactory.create();
    const token = jwt.sign(
      { user: { email: user.dataValues.email, id: user.dataValues.id } },
      process.env.AUTH_SECRET,
      { expiresIn: '-10s' }
    );
    console.log(token);
    await sessionFactory.create({ userId: user.dataValues.id, token });
    const response = await request(app)
      .get('/allusers')
      .set({ Authorization: token });
    expect(response.statusCode).toBe(404);
  }, 10000);
});
