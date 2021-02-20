import chai from 'chai';
import { stub } from 'sinon';
import supertest from 'supertest';
import app from '..';
import db from '../database/config';

const expect = chai.expect;
const request = supertest(app);

describe('Signup tests', () => {
  after('Clear the database', async () => {
    await db.sync({ force: true });
  });
  it('should signup a user', async () => {
    const res = await request.post('/api/auth/signup').send({
      firstName: "Brian",
      lastName: "Gitego",
      username: "gbrian",
      password: "Password"
    });
    expect(res.status).to.eql(201);
  });
});