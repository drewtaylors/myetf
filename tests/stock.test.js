import request from 'supertest';

import app from '../src/app';
import Stock from '../src/models/stock.model';
import {
  stockOne,
  fundOneId,
  setupDatabase
} from './fixtures/db';

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
const invalidTicker = 'INVALIDTICKER';


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
    .then(stock => expect(stock).toMatchObject(newStock));
});

test('should fetch all stocks', () => {
  return request(app)
    .get('/api/stocks')
    .send()
    .then(res => expect(res.body).toHaveLength(2));
});

test('should fetch all stocks by ticker', () => {
  return request(app)
    .get(`/api/stocks/${stockOne.ticker}`)
    .then(res => expect(res.body).toMatchObject({
      ticker: stockOne.ticker,
      name: stockOne.name,
      fund: stockOne.fund,
      tags: stockOne.tags,
      proportionOfFund: stockOne.proportionOfFund
    }))
});

// test('should fetch fund by ticker', () => {
// 	return request(app)
// 		.get(`/api/funds/${fundOne.ticker}`)
// 		.then(res => expect(res.body).toMatchObject({
// 			ticker: fundOne.ticker,
// 			name: fundOne.name
// 		}));
// });

// test('should throw error when nonexistent fund', () => {
// 	const invalidTicker = 'INVALIDTICKER';
// 	return request(app)
// 		.get(`/api/funds/${invalidTicker}`)
// 		.send()
// 		.expect(404);
// });

// test('should update fund', () => {
// 	const newFund = {
// 		ticker: 'SPY',
// 		name: 'SPDR S&P 500 ETF'
// 	};

// 	return request(app)
// 		.patch(`/api/funds/${fundOne.ticker}`)
// 		.send(newFund)
// 		.then(res => Fund.findOne({ _id: res.body._id }))
// 		.then(fund => expect(fund).toMatchObject(newFund));
// });

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