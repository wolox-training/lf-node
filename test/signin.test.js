'use strict';
const request = require('supertest');
const app = require('../app');
const userFactory = require('./factory/userFactory');
const { hashPassword } = require('../app/helpers/user_password');

describe('POST /users/sessions', () => {
  it('responds with an accessToken when email and password sent match the ones stored in database', async () => {
    const defaultPassword = '12345678t';
    const hash = await hashPassword(defaultPassword);
    const userCredentials = { email: 'successuser@wolox.com', password: hash };
    await userFactory.create(userCredentials);
    const response = await request(app)
      .post('/users/sessions')
      .send({ email: 'successuser@wolox.com', password: defaultPassword });
    expect(response.statusCode).toBe(200);
  });
  it('responds with error status code when the email sent doesnt exists', async () => {
    const userCredentials = { email: 'non-existent@wolox.co', password: 'idontknow' };
    const response = await request(app)
      .post('/users/sessions')
      .send(userCredentials);
    expect(response.statusCode).toBe(404);
    expect.objectContaining('message', 'user not found');
  });
  it('responds with error status code when the password sent doesnt match with the record', async () => {
    const defaultPassword = '12345678t';
    const hash = await hashPassword(defaultPassword);
    const userCredentials = { email: 'successuser@wolox.com', password: hash };
    await userFactory.create(userCredentials);
    const response = await request(app)
      .post('/users/sessions')
      .send({ email: 'successuser@wolox.com', password: '1234567t' });
    expect(response.statusCode).toBe(401);
    expect.objectContaining('message', 'password incorrect');
  });
});
