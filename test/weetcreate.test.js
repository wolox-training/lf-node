'use strict';
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const userFactory = require('./factory/userFactory');

describe('POST /weets', () => {
  it('responds with a success status code when trying to post a weet with a valid token', async () => {
    const user = await userFactory.create();
    const token = jwt.sign(
      { user: { email: user.dataValues.email, id: user.dataValues.id } },
      process.env.AUTH_SECRET
    );
    const response = await request(app)
      .post('/weets')
      .set({ Authorization: token });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual('successfuly created');
  });

  it('responds with a success status code when trying to post a weet with an invalid token', async () => {
    const user = await userFactory.create();
    const token = jwt.sign({ user: { email: user.dataValues.email, id: user.dataValues.id } }, 'nonAuth');
    const response = await request(app)
      .post('/weets')
      .set({ Authorization: token });
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual('it needs to be a valid token');
  });

  it('responds with a success status code when trying to post a weet with an invalid user', async () => {
    const user = await userFactory.create();
    const token = jwt.sign({ user: { email: user.dataValues.email, id: 20 } }, process.env.AUTH_SECRET);
    const response = await request(app)
      .post('/weets')
      .set({ Authorization: token });
    expect(response.statusCode).toBe(500);
    expect.stringContaining('database_error');
  });
});
// chequear que no pase los 500 caracteres
