import request from 'supertest';
import mongoose from 'mongoose';

import app from '../src/app';
import Stock from '../src/models/stock.model';
import {
  stockOne,
  setupDatabase
} from './fixtures/db';

beforeEach(() => {
	return setupDatabase();
});

// Constants used throughout tests
const newStock = {
  ticker: 'GOOG',
  name: 'Alphabet Inc Class C',
  tags: [
    'Media and Entertainment',
    'Interactive Media and Services',
    'Interactive Media and Services',
    'Online Services'
  ]
};
const invalidTicker = 'invalidTicker';


test('should add a new stock', () => {
  return request(app)
    .post('/api/stocks')
    .send(newStock)
    .expect(201);
});

test('should add the correct stock', () => {
  return request(app)
    .post('/api/stocks')
    .send(newStock)
    .then(res => Stock.findById(res.body._id))
    .then(stock => expect(stock).toBeTruthy());
});

test('should throw error when attempting to add existing stock', () => {
  return request(app)
    .post('/api/stocks')
    .send({
      ticker: stockOne.ticker,
      name: stockOne.name,
      tags: stockOne.tags
    });
})

test('should fetch all stocks', () => {
  return request(app)
    .get('/api/stocks')
    .send()
    .then(res => expect(res.body).toHaveLength(3));
});

test('should fetch a stock by ticker', () => {
  return request(app)
    .get(`/api/stocks/${stockOne.ticker}`)
    .send()
    .then(res => expect(res.body.ticker).toEqual(stockOne.ticker));
});

test('should throw error when nonexistent stock', () => {
  return request(app)
    .get(`/api/stocks/${invalidTicker}`)
    .send()
    .expect(404);
});

test('should update stock', () => {
  const { name, ticker } = newStock;

  return request(app)
    .patch(`/api/stocks/${stockOne.ticker}`)
    .send({
      name,
      ticker
    })
    .then(res => expect(res.body).toMatchObject({
      name,
      ticker
    }));
});

test('should not update anything if nonexistent fund', () => {
  const { name, ticker } = newStock;

  return request(app)
    .patch(`/api/funds/${invalidTicker}`)
    .send({
      name,
      ticker
    })
    .expect(404);
});

test('should remove stock', () => {
  return request(app)
    .delete(`/api/stocks/${stockOne.ticker}`)
    .send()
    .then(res => Stock.findById(res.body._id))
    .then(stock => expect(stock).toBeNull());
});

test('should not remove anything if nonexistent stock', () => {
  return request(app)
    .delete(`/api/stocks/${invalidTicker}`)
    .send()
    .expect(404);
});
