const { factory } = require('factory-girl');
const rating = require('../../app/models').Rating;

factory.define('rating', rating, () => ({
  weetId: 1,
  UserId: 1,
  score: 1
}));

module.exports = {
  create: params => factory.create('rating', params),
  createMany: (num = 5, params) => factory.createMany('rating', num, params),
  build: params => factory.build('rating', params),
  attributes: params => factory.attrs('rating', params),
  cleanUp: params => factory.cleanUp('rating', params)
};
