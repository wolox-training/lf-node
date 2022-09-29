const { factory } = require('factory-girl');
const weet = require('../../app/models').Weets;

factory.define('weet', weet, () => ({
  UserId: 1,
  content: 'Esto es un weet'
}));

module.exports = {
  create: params => factory.create('weet', params),
  createMany: (num = 5, params) => factory.createMany('weet', num, params),
  build: params => factory.build('weet', params),
  attributes: params => factory.attrs('weet', params),
  cleanUp: params => factory.cleanUp('weet', params)
};
