const request = require('supertest');
const app = require('../app');
const User = require('../app/models/index').Users;

describe('POST #signup', () => {
  test('With valid params, it creates a User', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'McTesting',
        email: 'test@wolox.com.ar',
        password: '12345678'
      });

    const createdUser = await User.findAll({
      where: {
        firstName: 'Test',
        lastName: 'McTesting',
        email: 'test@wolox.com.ar'
      }
    });
    console.log(createdUser);
    expect(response.statusCode).toEqual(201);
    expect(createdUser.length).toEqual(1);
    expect(createdUser[0].firstName).toEqual('Test');
    expect(createdUser[0].lastName).toEqual('McTesting');
    expect(createdUser[0].email).toEqual('test@wolox.com.ar');
  });

  test('With an existing email, it returns an Error', async () => {
    User.create({
      firstName: 'Test',
      lastName: 'McTesting',
      email: 'test@wolox.com.ar',
      password: '12345678'
    });

    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'TestJr',
        lastName: 'McTesting',
        email: 'test@wolox.com.ar',
        password: '12345678'
      });

    const createdUser = await User.findAll({
      where: {
        email: 'test@wolox.com.ar'
      }
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('internalCode', 'database_error');
    expect(response.body).toHaveProperty('message', 'Validation error: Email address already in use!');

    expect(createdUser.length).toEqual(1);
    expect(createdUser[0].firstName).toEqual('Test');
    expect(createdUser[0].lastName).toEqual('McTesting');
    expect(createdUser[0].email).toEqual('test@wolox.com.ar');
  });

  test('With an empty required param, it returns an Error', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'McTesting',
        password: '12345678'
      });

    const createdUser = await User.findAll({
      where: {
        firstName: 'Test',
        lastName: 'McTesting'
      }
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('internalCode', 'database_error');
    expect(response.body).toHaveProperty('message', 'notNull Violation: The email field is empty');

    expect(createdUser.length).toEqual(0);
  });

  test('With a weak password, it returns an Error', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        firstName: 'Test',
        lastName: 'McTesting',
        email: 'test@wolox.com.ar',
        password: '123'
      });

    const createdUser = await User.findAll({
      where: {
        firstName: 'Test',
        lastName: 'McTesting',
        email: 'test@wolox.com.ar'
      }
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message', 'Password must be 8 characters or more');

    expect(createdUser.length).toEqual(0);
  });
});
