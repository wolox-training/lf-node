const { factory } = require('factory-girl');
const { faker } = require('@faker-js/faker');
const User = require('../../app/models').Users;

factory.define('user', User, () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(null, null, 'wolox.com.ar'),
  password: factory.chance('string', { length: 8, alpha: true, numeric: true })
}));

module.exports = {
  create: params => factory.create('user', params),
  createMany: (num = 5, params) => factory.createMany('user', num, params),
  build: params => factory.build('user', params),
  attributes: params => factory.attrs('user', params),
  cleanUp: params => factory.cleanUp('user', params)
};
