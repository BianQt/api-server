'use strict';

const { app } = require('../src/server'); // destructing assignment 
const supertest = require('supertest');
const mockRequest = supertest(app);
const { db } = require('../src/models/index');

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});


describe('Server Test', () => {

  // Check if server is alive

  test('/', async () => {
    const response = await mockRequest.get('/');
    expect(response.text).toBe('Server is Up & Running!');
  });

  // Check if 404 is handled 

  test('Should respond with 404 status on an invalid method', async () => {
    const response = await mockRequest.get('/boo');
    expect(response.status).toBe(404);
  });

  
   // Customers test

   it('can add a customer', async () => {
    const response = await mockRequest.post('/customer').send({
      firstName:"bayan",
      lastName: "Qutshan",
      address: "Jordan",
      phone_num: "05625189"
    });
    expect(response.status).toBe(201);
  });

  it('can get all customers', async () => {
    const response = await mockRequest.get('/customers');
    expect(response.status).toBe(200);
  });

  it('can get one customer', async () => {
    const response = await mockRequest.get('/customer/1');
    expect(response.status).toBe(200);
  });

  it('can update a customer', async () => {
    const response = await mockRequest.put('/customer/1').send({
      firstName:"Sara",
      lastName: "A",
      address: "Irbid",
      phone_num: "05625589"
  });
  expect(response.status).toBe(201);
  });

  
  it('can delete a customer', async () => {
    const response = await mockRequest.delete('/customer/1');
    expect(response.status).toBe(204);
  });

  
  // Movies test

  it('can add a movie', async () => {
    const response = await mockRequest.post('/movie').send({
        title:"RED",
        category: "action",
        rate:"PG-13",
        release_date:2010,
        customer_id:1
    });
    expect(response.status).toBe(201);
  });

  it('can get all movies', async () => {
    const response = await mockRequest.get('/movies');
    expect(response.status).toBe(200);
  });

  it('can get one movie', async () => {
    const response = await mockRequest.get('/movie/1');
    expect(response.status).toBe(200);
  });

  it('can update a movie', async () => {
    const response = await mockRequest.put('/movie/1').send({
      title:"RED Ii",
      category: "action",
      rate:"PG-13",
      release_date:2015,
      customer_id:1
  });
  expect(response.status).toBe(201);
  });

  
  it('can delete a movie', async () => {
    const response = await mockRequest.delete('/movie/1');
    expect(response.status).toBe(204);

  });


});