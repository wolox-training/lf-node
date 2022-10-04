'use strict';
const request = require('supertest');
const app = require('../app');
const { userFactory } = require('./factory');
const { hashPassword } = require('../app/helpers/user_password');

const defaultPassword = '12345678t';
const defaultSignin = { email: 'non-existent@wolox.co', password: 'idontknow' };

describe('POST /users/sessions', () => {
  it('responds with an accessToken when email and password sent match the ones stored in database', async () => {
    const hash = await hashPassword(defaultPassword);
    const userCredentials = { email: defaultSignin.email, password: hash };
    await userFactory.create(userCredentials);
    const response = await request(app)
      .post('/users/sessions')
      .send({ email: defaultSignin.email, password: defaultPassword });
    expect(response.statusCode).toBe(200);
  });
  it('responds with error status code when the email sent doesnt exists', async () => {
    const userCredentials = defaultSignin;
    const response = await request(app)
      .post('/users/sessions')
      .send(userCredentials);
    expect(response.statusCode).toBe(404);
    expect.objectContaining('message', 'user not found');
  });
  it('responds with error status code when the password sent doesnt match with the record', async () => {
    const hash = await hashPassword(defaultPassword);
    const userCredentials = { email: defaultSignin.email, password: hash };
    await userFactory.create(userCredentials);
    const response = await request(app)
      .post('/users/sessions')
      .send({ email: defaultSignin.email, password: '1234567t' });
    expect(response.statusCode).toBe(401);
    expect.objectContaining('message', 'password incorrect');
  });
});
