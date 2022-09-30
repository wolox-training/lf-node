const { factory } = require('factory-girl');
const session = require('../../app/models').Sessions;

factory.define('session', session, () => ({
  UserId: 1,
  token: 'eyfhksdhgfyuiesw8gfweuhsf'
}));

module.exports = {
  create: params => factory.create('session', params),
  createMany: (num = 5, params) => factory.createMany('session', num, params),
  build: params => factory.build('session', params),
  attributes: params => factory.attrs('session', params),
  cleanUp: params => factory.cleanUp('session', params)
};
