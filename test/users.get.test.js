'use strict';
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const userFactory = require('./factory/userFactory');

describe('POST /users', () => {
  const defaultLimit = 1;
  const defalutPage = 1;
  it('responds with a success status code when data sent meets all the criteria', async () => {
    const user = await userFactory.create();
    const token = jwt.sign(
      { user: { email: user.dataValues.email, id: user.dataValues.id } },
      process.env.AUTH_SECRET
    );
    const response = await request(app)
      .get('/allusers')
      .set({ Authorization: token })
      .query({ limit: defaultLimit, page: defalutPage });
    expect(response.statusCode).toBe(200);
  });
  it('responds with a success status code when the request has an empty params', async () => {
    const user = await userFactory.create();
    const token = jwt.sign(
      { user: { email: user.dataValues.email, id: user.dataValues.id } },
      process.env.AUTH_SECRET
    );
    const response = await request(app)
      .get('/allusers')
      .set({ Authorization: token });
    expect(response.statusCode).toBe(200);
    expect(response.body.users.length).toBe(1);
  });
  it('responds with a success status code when the request does not have the authorization token', async () => {
    const response = await request(app)
      .get('/allusers')
      .query({ limit: defaultLimit, page: defalutPage });
    expect(response.statusCode).toBe(400);
    expect.objectContaining('message', 'a token is required');
  });
  it('responds with a success status code  when the request has an invalid token', async () => {
    const response = await request(app)
      .get('/allusers')
      .query({ limit: defaultLimit, page: defalutPage })
      .set({
        Authorization:
          'eyJhbGciOiJIUzI1NiJ9.VHJ5Y2lhLkVyZG1hbjM4QHdvbG94LmNvbS5hcg.VVgArJVUBUQawjUU2_u31LpFRz7NOGDtjMvYNXYLoO'
      });
    expect(response.statusCode).toBe(404);
    expect.objectContaining('message', 'it needs to be a valid token');
  });
  it('responds with a success status code and return the number of users requested on the page', async () => {
    const testLimit = 3;
    const user = await userFactory.create();
    const token = jwt.sign(
      { user: { email: user.dataValues.email, id: user.dataValues.id } },
      process.env.AUTH_SECRET
    );
    await userFactory.createMany(6);
    const response = await request(app)
      .get('/allusers')
      .set({ Authorization: token })
      .query({ limit: testLimit, page: defalutPage });
    expect(response.statusCode).toBe(200);
    expect(response.body.users.length).toBe(testLimit);
  });
});
