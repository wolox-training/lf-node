'use strict';
const request = require('supertest');
const app = require('../app');
const userFactory = require('./factory/userFactory');
const objects = require('../config/userObjects');

describe('POST /users', () => {
  it('responds with a success status code when data sent meets all the criteria', async () => {
    await userFactory.create();
    const response = await request(app)
      .post('/users')
      .send(objects.succesUser);
    expect(response.statusCode).toBe(201);
  });
  it('responds with error status code and internal_code when the password is too short', async () => {
    const response = await request(app)
      .post('/users')
      .send({ ...objects.succesUser, password: objects.shortPassword });
    expect(response.statusCode).toBe(400);
    expect(response.body.message[0].msg).toBe('must be at least 8 chars long');
  });
  it('responds with expected error status code and internal_code when the email is not from Wolox domain', async () => {
    const response = await request(app)
      .post('/users')
      .send({ ...objects.succesUser, email: objects.NonWoloxEmail });
    expect(response.statusCode).toBe(400);
    expect(response.body.message[0].msg).toBe('it needs to be a mail from wolox');
  });
  it('responds with expected error status code and internal_code when there is an existing user with same email', async () => {
    const userParams = await userFactory.create();
    const response = await request(app)
      .post('/users')
      .send(userParams.dataValues);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('internalCode', 'database_error');
    expect(response.body).toHaveProperty('message', 'Validation error: Email address already in use!');
  });
  it('responds with expected error status code and internal_code when there is one of the required params missing', async () => {
    const params = ['firstName', 'lastName', 'email', 'password'];
    const randomParam = params[Math.floor(Math.random() * params.length)];
    const testParams = objects.succesUser;
    testParams[`${randomParam}`] = '';
    const response = await request(app)
      .post('/users')
      .send(testParams);
    expect(response.statusCode).toBe(400);
    expect(response.body.message[0].msg).toBe('The field cannot be empty');
  });
});
