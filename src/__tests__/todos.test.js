import chai from 'chai';
import supertest from 'supertest';
import app from '..';
import log from '../config/debug';
import db from '../database/config';
import mockData from './utils/mockData';

'use strict';

const expect = chai.expect;
const request = supertest(app);

describe('Todos tests', () => {
  before('authenticate users', async () => {
    const { username, password } = mockData.signup;
    await request.post('/api/auth/signup').send(mockData.signup);
    const res = await request.post('/api/auth/login').send({ username, password });
    mockData.tokenOne = res.body.data.token;
    await request.post('/api/auth/signup').send({ ...mockData.signup, username: 'usernametwo' });
    const res2 = await request.post('/api/auth/login').send({ username: 'usernametwo', password });
    mockData.tokenTwo = res2.body.data.token;
  });
  after('Clear the database', async () => {
    await db.sync({ force: true });
  });
  it('should create a todo', async () => {
    const res = await request.post('/api/todos')
      .set('Authorization', `Bearer ${mockData.tokenOne}`)
      .send(mockData.todo);
    mockData.todoId1 = res.body.data.id;
    expect(res.status).to.eql(201);
  });
  it('should create another todo', async () => {
    const res = await request.post('/api/todos')
      .set('Authorization', `Bearer ${mockData.tokenTwo}`)
      .send(mockData.todo);
    mockData.todoId2 = res.body.data.id;
    expect(res.status).to.eql(201);
  });
  it('should get todos', async () => {
    const res = await request.get('/api/todos')
      .set('Authorization', `Bearer ${mockData.tokenOne}`);
    expect(res.status).to.eql(200);
  });
  it('should search todos', async () => {
    const res = await request.get('/api/todos?s=' + mockData.todo.title.split(' ')[0])
      .set('Authorization', `Bearer ${mockData.tokenOne}`);
    expect(res.status).to.eql(200);
  });
  it('should get one todo', async () => {
    const res = await request.get('/api/todos/' + mockData.todoId1)
      .set('Authorization', `Bearer ${mockData.tokenOne}`);
    expect(res.status).to.eql(200);
  });
  it('should not get another\'s todo', async () => {
    const res = await request.get('/api/todos/' + mockData.todoId2)
      .set('Authorization', `Bearer ${mockData.tokenOne}`);
    expect(res.status).to.eql(404);
  });
  it('should update todo', async () => {
    const res = await request.patch('/api/todos/' + mockData.todoId2)
      .set('Authorization', `Bearer ${mockData.tokenTwo}`)
      .send({ ...mockData.todo, title: 'Updated title' });
    expect(res.status).to.eql(200);
  });
  it('should not update todo with wrong info', async () => {
    const res = await request.patch('/api/todos/' + mockData.todoId2)
      .set('Authorization', `Bearer ${mockData.tokenTwo}`)
      .send({ ...mockData.todo, priority: 'extra high' });
    expect(res.status).to.eql(400);
  });
  it('should not create a todo while unauthenticated', async () => {
    const res = await request.post('/api/todos')
      .set('Authorization', `Bearer ${mockData.tokenTwo}haa`)
      .send(mockData.todo);
    expect(res.status).to.eql(401);
  });
  it('should delete todo', async () => {
    const res = await request.delete('/api/todos/' + mockData.todoId2)
      .set('Authorization', `Bearer ${mockData.tokenTwo}`);
    expect(res.status).to.eql(200);
  });
});