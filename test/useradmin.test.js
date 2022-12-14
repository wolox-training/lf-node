'use strict';
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { userFactory, sessionFactory } = require('./factory');
const objects = require('../config/userObjects');

describe('POST /users', () => {
  it('responds with a success status code when i try to create a user with admin role', async () => {
    const admin = await userFactory.create({ role: 'admin' });
    const token = jwt.sign(
      { user: { email: admin.dataValues.email, id: admin.dataValues.id } },
      process.env.AUTH_SECRET
    );
    await sessionFactory.create({ userId: admin.dataValues.id, token });
    const response = await request(app)
      .post('/users/admin')
      .set({ Authorization: token })
      .send({ ...objects.succesUser, role: objects.adminRole });
    expect(response.statusCode).toBe(201);
    expect.objectContaining('message', 'successfuly created');
  });
  it('responds with a success status code when I try to update the role of a pre-existing user', async () => {
    const admin = await userFactory.create({ role: 'admin' });
    const user = await userFactory.create();
    const token = jwt.sign(
      { user: { email: admin.dataValues.email, id: admin.dataValues.id } },
      process.env.AUTH_SECRET
    );
    await sessionFactory.create({ userId: admin.dataValues.id, token });
    const response = await request(app)
      .post('/users/admin')
      .set({ Authorization: token })
      .send(user.dataValues);
    expect(response.statusCode).toBe(201);
    expect.objectContaining('message', 'successfuly updated');
  });
  it('responds with an error code when I try to create a user without having admin role', async () => {
    const admin = await userFactory.create();
    const token = jwt.sign(
      { user: { email: admin.dataValues.email, id: admin.dataValues.id } },
      process.env.AUTH_SECRET
    );
    await sessionFactory.create({ userId: admin.dataValues.id, token });
    const response = await request(app)
      .post('/users/admin')
      .set({ Authorization: token })
      .send({ ...objects.succesUser, role: objects.adminRole });
    expect(response.statusCode).toBe(401);
    expect.objectContaining('message', 'you do not have admin permissions');
  });
  it('responds with an error status code when I try to update the role of a pre-existing user without having admin role', async () => {
    const admin = await userFactory.create();
    const user = await userFactory.create();
    const token = jwt.sign(
      { user: { email: admin.dataValues.email, id: admin.dataValues.id } },
      process.env.AUTH_SECRET
    );
    await sessionFactory.create({ userId: admin.dataValues.id, token });
    const response = await request(app)
      .post('/users/admin')
      .set({ Authorization: token })
      .send(user.dataValues);
    expect(response.statusCode).toBe(401);
    expect.objectContaining('message', 'you do not have admin permissions');
  });
});
