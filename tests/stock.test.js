import request from 'supertest';
import mongoose from 'mongoose';

import app from '../src/app';
import Stock from '../src/models/stock.model';
import {
  stockOne,
  stockOneId,
  fundOneId,
  setupDatabase
} from './fixtures/db';
import { Mongoose } from 'mongoose';

beforeEach(() => {
	return setupDatabase();
});

// Constants used throughout tests
const newStock = {
  ticker: 'GOOG',
  name: 'Alphabet Inc Class C',
  fund: fundOneId,
  tags: [
    'Media and Entertainment',
    'Interactive Media and Services',
    'Interactive Media and Services',
    'Online Services'
  ],
  proportionOfFund: 1.49
};
const unusedID = new mongoose.Types.ObjectId();


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

test('should fetch all stocks', () => {
  return request(app)
    .get('/api/stocks')
    .send()
    .then(res => expect(res.body).toHaveLength(2));
});

test('should fetch a stock by ID', () => {
  return request(app)
    .get(`/api/stocks/${stockOne._id}`)
    .send()
    .then(res => expect(res.body._id).toEqual(stockOne._id.toString()));
});

test('should throw error when nonexistent stock', () => {
  return request(app)
    .get(`/api/stocks/${unusedID}`)
    .send()
    .expect(404);
});

test('should update stock', () => {
  const { name, ticker } = newStock;

  return request(app)
    .patch(`/api/stocks/${stockOne._id}`)
    .send({
      name,
      ticker
    })
    .then(res => expect(res.body).toMatchObject({
      _id: stockOne._id.toString(),
      name,
      ticker
    }));
});

test('should not update anything if nonexistent fund', () => {
  const { name, ticker } = newStock;

  return request(app)
    .patch(`/api/funds/${unusedID}`)
    .send({
      name,
    })
    .expect(404);
});

test('should remove stock', () => {
  return request(app)
    .delete(`/api/stocks/${stockOne._id}`)
    .send()
    .then(res => Stock.findById(res.body._id))
    .then(stock => expect(stock).toBeNull());
});

test('should not remove anything if nonexistent stock', () => {
  return request(app)
    .delete(`/api/stocks/${unusedID}`)
    .send()
    .expect(404)
})

// test('should not update anything if nonexistent fund', () => {
// 	const invalidTicker = 'INVALIDTICKER';
// 	const newFund = {
// 		ticker: 'SPY',
// 		name: 'SPDR S&P 500 ETF'
// 	};

// 	return request(app)
// 		.patch(`/api/funds/${invalidTicker}`)
// 		.send(newFund)
// 		.expect(404);
// });

// test('should remove fund', () => {
// 	return request(app)
// 		.delete(`/api/funds/${fundOne.ticker}`)
// 		.send()
// 		.then(res => Fund.findOne({ ticker: res.body.ticker }))
// 		.then(fund => expect(fund).toBeFalsy());
// });

// test('should not remove anything if nonexistent fund', () => {
// 	const invalidTicker = 'INVALIDTICKER';

// 	return request(app)
// 		.delete(`/api/funds/${invalidTicker}`)
// 		.send()
// 		.expect(404);
// });