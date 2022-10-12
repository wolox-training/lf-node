'use strict';
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { userFactory, weetFactory, sessionFactory, ratingFactory } = require('./factory');

describe('POST /users', () => {
  // these are the previous ratings
  let defaultRates = 3;
  // this user rate after in the request
  let lastUserRate = 4;
  // These are the total users who interact
  let defaultCreate = 5;
  it('responds with a success status code and DEV position when i try to rate a weet for the fourth time', async () => {
    const user = await userFactory.createMany(defaultCreate);
    const weets = await weetFactory.create();
    // the for loop starts with 1 because the first user is the weet owner
    for (let i = 1; i <= defaultRates; i++) {
      await ratingFactory.create({ userId: user[i].dataValues.id });
    }
    const token = jwt.sign(
      { user: { email: user[lastUserRate].dataValues.email, id: user[lastUserRate].dataValues.id } },
      process.env.AUTH_SECRET
    );
    await sessionFactory.create({ userId: user[lastUserRate].dataValues.id, token });
    const response = await request(app)
      .post(`/weets/${weets.dataValues.id}/ratings`)
      .set({ Authorization: token })
      .send({ score: 1 });
    expect(response.statusCode).toBe(201);
    expect(response.body.position[0].total).toBe('4');
    expect(response.body.calc).toBe('DEV');
  });

  it('responds with a success status code and LEAD position when the weet had 4 positives ratings and was rated one more time with 1', async () => {
    defaultRates = 4;
    lastUserRate = 5;
    defaultCreate = 6;
    const user = await userFactory.createMany(defaultCreate);
    const weets = await weetFactory.create();
    for (let i = 1; i <= defaultRates; i++) {
      await ratingFactory.create({ userId: user[i].dataValues.id });
    }
    const token = jwt.sign(
      { user: { email: user[lastUserRate].dataValues.email, id: user[lastUserRate].dataValues.id } },
      process.env.AUTH_SECRET
    );
    await sessionFactory.create({ userId: user[lastUserRate].dataValues.id, token });
    const response = await request(app)
      .post(`/weets/${weets.dataValues.id}/ratings`)
      .set({ Authorization: token })
      .send({ score: 1 });
    expect(response.statusCode).toBe(201);
    expect(response.body.position[0].total).toBe('5');
    expect(response.body.calc).toBe('LEAD');
  });

  it('responds with a success status code and DEV position when the weet had 5 positives ratings and was rated one more time with -1', async () => {
    defaultRates = 5;
    lastUserRate = 6;
    defaultCreate = 7;
    const user = await userFactory.createMany(defaultCreate);
    const weets = await weetFactory.create();
    for (let i = 1; i <= defaultRates; i++) {
      await ratingFactory.create({ userId: user[i].dataValues.id });
    }
    const token = jwt.sign(
      { user: { email: user[lastUserRate].dataValues.email, id: user[lastUserRate].dataValues.id } },
      process.env.AUTH_SECRET
    );
    await sessionFactory.create({ userId: user[lastUserRate].dataValues.id, token });
    const response = await request(app)
      .post(`/weets/${weets.dataValues.id}/ratings`)
      .set({ Authorization: token })
      .send({ score: -1 });
    expect(response.statusCode).toBe(201);
    expect(response.body.position[0].total).toBe('4');
    expect(response.body.calc).toBe('DEV');
  });
  it('responds with a success status code and CEO position when the weet had 49 positives ratings and was rated one more time with 1', async () => {
    defaultRates = 49;
    lastUserRate = 50;
    defaultCreate = 51;
    const user = await userFactory.createMany(defaultCreate);
    const weets = await weetFactory.create();
    for (let i = 1; i <= defaultRates; i++) {
      await ratingFactory.create({ userId: user[i].dataValues.id });
    }
    const token = jwt.sign(
      { user: { email: user[lastUserRate].dataValues.email, id: user[lastUserRate].dataValues.id } },
      process.env.AUTH_SECRET
    );
    await sessionFactory.create({ userId: user[lastUserRate].dataValues.id, token });
    const response = await request(app)
      .post(`/weets/${weets.dataValues.id}/ratings`)
      .set({ Authorization: token })
      .send({ score: 1 });
    expect(response.statusCode).toBe(201);
    expect(response.body.position[0].total).toBe('50');
    expect(response.body.calc).toBe('CEO');
  });

  it('responds with a success status code and TL position when one weet had 9 positives ratings and was rated another weet from the same user with 1', async () => {
    defaultRates = 9;
    lastUserRate = 10;
    defaultCreate = 11;
    const user = await userFactory.createMany(defaultCreate);
    const weets = await weetFactory.createMany(2);
    for (let i = 1; i <= defaultRates; i++) {
      await ratingFactory.create({ userId: user[i].dataValues.id });
    }
    const token = jwt.sign(
      { user: { email: user[lastUserRate].dataValues.email, id: user[lastUserRate].dataValues.id } },
      process.env.AUTH_SECRET
    );
    await sessionFactory.create({ userId: user[lastUserRate].dataValues.id, token });
    const response = await request(app)
      // add a rating to another weet but from the same user
      .post(`/weets/${weets[1].dataValues.id}/ratings`)
      .set({ Authorization: token })
      .send({ score: 1 });
    expect(response.statusCode).toBe(201);
    expect(response.body.position[0].total).toBe('10');
    expect(response.body.calc).toBe('TL');
  });

  it('responds with a error status code and when someone was rated one more time with the same rate and user', async () => {
    defaultRates = 1;
    lastUserRate = 1;
    defaultCreate = 2;
    const user = await userFactory.createMany(defaultCreate);
    const weets = await weetFactory.create();
    await ratingFactory.create({ userId: user[1].dataValues.id });
    const token = jwt.sign(
      { user: { email: user[lastUserRate].dataValues.email, id: user[lastUserRate].dataValues.id } },
      process.env.AUTH_SECRET
    );
    await sessionFactory.create({ userId: user[lastUserRate].dataValues.id, token });
    const response = await request(app)
      .post(`/weets/${weets.dataValues.id}/ratings`)
      .set({ Authorization: token })
      .send({ score: 1 });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('can not send the same rating');
  });
});
