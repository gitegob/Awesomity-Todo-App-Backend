import chai from 'chai';
import supertest from 'supertest';
import app from '..';

const expect = chai.expect;
const request = supertest(app);

describe('App tests', () => {
  it('should display a welcome message', async () => {
    const res = await request.get('/api');
    expect(res.status).to.eql(200);
  });
});