'use strict';
const request = require('supertest')(require('../app'));
const userFactory = require('./factory/userFactory');

describe('POST /users', () => {
  // beforeeach
  it('responds with a success status code and text when data sent meets all the criteria', async () => {
    const userParams = await userFactory.create({
      firstName: 'Pedroo'
    });
    console.log(userParams);
    const response = await request.post('/users').send({
      firstName: 'Lucass',
      lastName: 'Fozzatiasd',
      email: 'dasttsa@wolox.com',
      password: 'dsaddgsdgsdf'
    });
    console.log(response);
    expect(response.statusCode).toBe(201);
  });
  // aftereach
});
