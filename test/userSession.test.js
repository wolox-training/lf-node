const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { userFactory, sessionFactory } = require('./factory');

describe('POST /users', () => {
  it('responds with a error status code when I try to get a list of users with an expired token', async () => {
    const user = await userFactory.create();
    const token = jwt.sign(
      { user: { email: user.dataValues.email, id: user.dataValues.id } },
      process.env.AUTH_SECRET,
      { expiresIn: '-10s' }
    );
    await sessionFactory.create({ userId: user.dataValues.id, token });
    const response = await request(app)
      .get('/allusers')
      .set({ Authorization: token });
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('it needs to be a valid token');
  });

  it('responds with a error status code when I try to get a list of users with a different token', async () => {
    const user = await userFactory.create();
    const token = jwt.sign(
      { user: { email: user.dataValues.email, id: user.dataValues.id } },
      process.env.AUTH_SECRET
    );
    await sessionFactory.create({ userId: user.dataValues.id, token });
    const response = await request(app)
      .get('/allusers')
      .set({ Authorization: `${token}p` });
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('it needs to be a valid token');
  });

  it('responds with a success status code when I try to get a list of users with a valid token', async () => {
    const user = await userFactory.create();
    const token = jwt.sign(
      { user: { email: user.dataValues.email, id: user.dataValues.id } },
      process.env.AUTH_SECRET
    );
    await sessionFactory.create({ userId: user.dataValues.id, token });
    const response = await request(app)
      .get('/allusers')
      .set({ Authorization: token });
    expect(response.statusCode).toBe(200);
  });
});
