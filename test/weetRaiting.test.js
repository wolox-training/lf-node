'use strict';
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const userFactory = require('./factory/userFactory');
const weetFactory = require('./factory/weetFactory.js');

describe('POST /users', () => {
  it('responds with a success status code when i try to rate a weet for the first time', async () => {
    const user = await userFactory.create();
    const weet = await weetFactory.create({ userId: user.dataValues.id });
    const token = jwt.sign(
      { user: { email: user.dataValues.email, id: user.dataValues.id } },
      process.env.AUTH_SECRET
    );
    const response = await request(app)
      .post(`/weets/${weet.dataValues.id}/ratings`)
      .set({ Authorization: token })
      .send({ score: 1 });
    expect(response.statusCode).toBe(201);
  });
  it('responds with a success status code when i try to rate a weet again', async () => {
    const user = await userFactory.create();
    const weet = await weetFactory.create({ userId: user.dataValues.id });
    const token = jwt.sign(
      { user: { email: user.dataValues.email, id: user.dataValues.id } },
      process.env.AUTH_SECRET
    );
    const response = await request(app)
      .post(`/weets/${weet.dataValues.id}/ratings`)
      .set({ Authorization: token })
      .send({ score: -1 });
    expect(response.statusCode).toBe(201);
  });
  it('responds with an error status code when i try to rate a weet with an invalid session', async () => {
    const user = await userFactory.create();
    const weet = await weetFactory.create({ userId: user.dataValues.id });
    const token = jwt.sign(
      { user: { email: user.dataValues.email, id: user.dataValues.id } },
      process.env.AUTH_SECRET,
      { expiresIn: '-10s' }
    );
    const response = await request(app)
      .post(`/weets/${weet.dataValues.id}/ratings`)
      .set({ Authorization: token })
      .send({ score: -1 });
    expect(response.statusCode).toBe(404);
  });
});