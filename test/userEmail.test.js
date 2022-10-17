'use strict';
const request = require('supertest');
const app = require('../app');
const { userFactory } = require('./factory');
const objects = require('../config/userObjects');

describe('POST /users', () => {
  it('responds with a success status code when a welcome email is sent', async () => {
    await userFactory.create();
    const response = await request(app)
      .post('/users')
      .send(objects.succesUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.infoEmail[0]).toBe(objects.succesUser.email);
  });
  it('responds with an error status code when a welcome email is not sent because the email already exists', async () => {
    await userFactory.create(objects.succesUser);
    const response = await request(app)
      .post('/users')
      .send(objects.succesUser);
    expect(response.statusCode).toBe(400);
  });
});
