'use strict';
const request = require('supertest');
const app = require('../app');
const userFactory = require('./factory/userFactory');

describe('POST /users', () => {
  // beforeeach
  it('responds with a success status code when data sent meets all the criteria', async () => {
    await userFactory.create();
    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'Lucass',
        lastName: 'Fozzatiasd',
        email: 'Test@wolox.com',
        password: 'dsaddgsdgsdf'
      });
    expect(response.statusCode).toBe(201);
  });
  // aftereach
  it('responds with error status code and internal_code when the password is too short', async () => {
    const userParams = await userFactory.create();
    console.log(userParams);
    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'Testing',
        lastName: 'testarin',
        email: 'Test@wolox.com',
        password: 'dsf'
      });
    expect(response.statusCode).toBe(400);
    expect.objectContaining('message', [
      { location: 'body', msg: 'must be at least 8 chars long', param: 'password', value: 'dsf' }
    ]);
  });

  it('responds with error status code and internal_code when the password is too short', async () => {
    const userParams = await userFactory.create();
    console.log(userParams);
    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'Testing',
        lastName: 'testarin',
        email: 'Test@wolox.com',
        password: '1234t'
      });
    expect(response.statusCode).toBe(400);
    expect.objectContaining('message', [
      { location: 'body', msg: 'must be at least 8 chars long', param: 'password', value: '1234t' }
    ]);
  });

  it('responds with expected error status code and internal_code when the email is not from Wolox domain', async () => {
    const userParams = await userFactory.create();
    console.log(userParams);
    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'Testing',
        lastName: 'testarin',
        email: 'Test@olox.com',
        password: '1234567t'
      });
    expect(response.statusCode).toBe(400);
    expect.objectContaining('message', [
      { location: 'body', msg: 'it needs to be a mail from wolox', param: 'email', value: 'Test@olox.com' }
    ]);
  });
  it('responds with expected error status code and internal_code when there is an existing user with same email', async () => {
    const userParams = await userFactory.create({
      firstName: 'Lucas',
      lastName: 'fozzatti',
      password: '1234567t7'
    });
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
    const testParams = {
      firstName: 'Lucas',
      lastName: 'fozzatti',
      email: 'Test@olox.com',
      password: '1234567t7'
    };
    testParams[`${randomParam}`] = '';
    console.log(testParams);
    const response = await request(app)
      .post('/users')
      .send(testParams);
    expect(response.statusCode).toBe(400);
    expect.objectContaining('message', [
      { location: 'body', msg: `The${randomParam}field cannot be empty`, param: randomParam, value: '' }
    ]);
  });
});
