import chai from 'chai';
import supertest from 'supertest';
import app from '..';

'use strict';

const expect = chai.expect;
const request = supertest(app);

describe('App tests', () => {
  it('should display a welcome message', async () => {
    const res = await request.get('/api');
    expect(res.status).to.eql(200);
  });
  it('should display a not found message', async () => {
    const res = await request.get('/api/foo');
    expect(res.status).to.eql(404);
  });
});