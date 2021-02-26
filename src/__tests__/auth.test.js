import chai from 'chai';
import {
  describe, it, after,
} from 'mocha';
import supertest from 'supertest';
import app from '..';
import db from '../database/config';
import mockData from './utils/mockData';

const { expect } = chai;
const request = supertest(app);

describe('Signup tests', () => {
  after('Clear the database', async () => {
    await db.sync({ force: true });
  });
  it('should signup a user', async () => {
    const res = await request.post('/api/auth/signup').send(mockData.signup);
    expect(res.status).to.eql(201);
  });
  it('should login a user', async () => {
    const { username, password } = mockData.signup;
    const res = await request.post('/api/auth/login').send({ username, password });
    expect(res.status).to.eql(200);
  });
  it('should not signup an existing user', async () => {
    const res = await request.post('/api/auth/signup').send(mockData.signup);
    expect(res.status).to.eql(409);
  });
  it('should not login a non existing user', async () => {
    const { password } = mockData.signup;
    const res = await request.post('/api/auth/login').send({ username: 'fooo', password });
    expect(res.status).to.eql(401);
  });
  it('should not login user with wrong password', async () => {
    const { username } = mockData.signup;
    const res = await request.post('/api/auth/login').send({ username, password: 'foo' });
    expect(res.status).to.eql(401);
  });
});
