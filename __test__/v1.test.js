'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const  server  = require('../src/server').app;
const request = supergoose(server);
let id;

describe('Model CRUD Test', () => {
  it('read all from DataBase test on GET /food when there is no data', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });
  it('create test on POST /food', async () => {
    const response = await request.post('/api/v1/food').send({
      name: 'apple',
      calories: 10,
      type: 'FRUIT',
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('apple');
    id = response.body._id;
  });
  it('should be able to read specific data on GET /food', async () => {
    const response = await request.get(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('apple');
  });
  it('read all from DataBase test on GET /food', async () => {
    const response = await request.get('/api/v1/food');
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  it('should be able to update data on PUT /food', async () => {
    const response = await request.put(`/api/v1/food/${id}`).send({
      name: 'apple',
      calories: 10,
      type: 'FRUIT'
    });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('apple');
  });

  it('should be able to delete data on DELETE /food', async () => {
    const response = await request.delete(`/api/v1/food/${id}`);
    expect(response.status).toEqual(200);
  });
  
  it('should throw an error if you add invalid model', async () => {
    const response = await request.get('/api/v1/movies');
    expect(response.status).toEqual(500);
  });
});