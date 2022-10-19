const { factory } = require('factory-girl');
const { faker } = require('@faker-js/faker');
const User = require('../../app/models').Users;

factory.define('user', User, () => ({
  firstName: faker.name.firstName().replace(/[^a-zA-Z ]/g, ''),
  lastName: faker.name.lastName().replace(/[^a-zA-Z ]/g, ''),
  email: faker.internet.email(null, null, 'wolox.com.ar'),
  password: factory.chance('string', { length: 8, alpha: true, numeric: true }),
  role: 'user'
}));

module.exports = {
  create: params => factory.create('user', params),
  createMany: (num = 5, params) => factory.createMany('user', num, params),
  build: params => factory.build('user', params),
  attributes: params => factory.attrs('user', params),
  cleanUp: params => factory.cleanUp('user', params)
};
