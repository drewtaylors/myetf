import request from 'supertest';

import app from '../src/app';
import Fund from '../src/models/fund.model';
import {
	fundOne,
	setupDatabase
} from './fixtures/db';

beforeEach(() => {
	return setupDatabase();
});

// Constants used throughout tests
const newFund = {
	ticker: 'SPY',
	name: 'SPDR S&P 500 ETF'
}
const invalidTicker = 'INVALIDTICKER'

test('should add a new fund', () => {
	return request(app)
		.post('/api/funds')
		.send(newFund)
		.expect(201);
});

test('should add the correct fund', () => {
	return request(app)
		.post('/api/funds')
		.send(newFund)
		.then(res => Fund.findOne({ _id: res.body._id }))
		.then(fund => expect(fund).toMatchObject(newFund));
});

test('should throw error when attempting to add existing fund', () => {
	return request(app)
		.post('/api/funds')
		.send({
			ticker: fundOne.ticker,
			name: fundOne.name
		})
		.expect(400);
});

test('should fetch all funds', () => {
	return request(app)
		.get('/api/funds')
		.send()
		.then(res => expect(res.body).toHaveLength(2));
});

test('should fetch fund by ticker', () => {
	return request(app)
		.get(`/api/funds/${fundOne.ticker}`)
		.send()
		.then(res => expect(res.body).toMatchObject({
			ticker: fundOne.ticker,
			name: fundOne.name
		}));
});

test('should throw error when nonexistent fund', () => {
	return request(app)
		.get(`/api/funds/${invalidTicker}`)
		.send()
		.expect(404);
});

test('should update fund', () => {
	return request(app)
		.patch(`/api/funds/${fundOne.ticker}`)
		.send(newFund)
		.then(res => Fund.findOne({ _id: res.body._id }))
		.then(fund => expect(fund).toMatchObject(newFund));
});

test('should not update anything if nonexistent fund', () => {
	return request(app)
		.patch(`/api/funds/${invalidTicker}`)
		.send(newFund)
		.expect(404);
});

test('should remove fund', () => {
	return request(app)
		.delete(`/api/funds/${fundOne.ticker}`)
		.send()
		.then(res => Fund.findOne({ ticker: res.body.ticker }))
		.then(fund => expect(fund).toBeNull());
});

test('should not remove anything if nonexistent fund', () => {
	return request(app)
		.delete(`/api/funds/${invalidTicker}`)
		.send()
		.expect(404);
});
