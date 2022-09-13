const { factory } = require('factory-girl');
// const faker = require('@faker-js/faker');
const User = require('../../app/models').Users;

factory.define('user', User, () => ({
  firstName: 'Testing',
  lastName: 'Testarin',
  email: 'testing@wolox.com',
  password: '12345678t'
}));

module.exports = {
  create: params => factory.create('user', params),
  createMany: (num = 5, params) => factory.createMany('user', num, params),
  build: params => factory.build('user', params),
  attributes: params => factory.attrs('user', params),
  cleanUp: params => factory.cleanUp('user', params)
};
