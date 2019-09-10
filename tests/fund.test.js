import request from 'supertest'

import app from '../src/app';
import Fund from '../src/models/fund.model';
import {
	fundOne,
	setupDatabase
} from './fixtures/db'

beforeEach(setupDatabase)

test('should add a new fund', () => {
	return request(app)
		.post('/api/funds')
		.send({
			ticker: 'SPY',
			name: 'SPDR S&P 500 ETF'
		})
		.expect(201);
});

test('should add the correct fund', () => {
	return request(app)
		.post('/api/funds')
		.send({
			ticker: 'SPY',
			name: 'SPDR S&P 500 ETF'
		})
		.then(res => Fund.findById(res.body._id))
		.then(fund => expect(fund).toMatchObject({
			ticker: 'SPY',
			name: 'SPDR S&P 500 ETF'
		}));
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
		.then(res => expect(res.body).toMatchObject({
			ticker: fundOne.ticker,
			name: fundOne.name
		}));
});

test('should throw error when nonexistent fund', () => {
	const invalidTicker = 'INVALIDTICKER';
	return request(app)
		.get(`/api/funds/${invalidTicker}`)
		.send()
		.expect(404);
});

test('should update fund', () => {
	const newFund = {
		ticker: 'SPY',
		name: 'SPDR S&P 500 ETF'
	};

	return request(app)
		.patch(`/api/funds/${fundOne.ticker}`)
		.send(newFund)
		.then(res => Fund.findOne({ _id: res.body._id }))
		.then(fund => expect(fund).toMatchObject(newFund));
});

test('should not update anything if nonexistent fund', () => {
	const invalidTicker = 'INVALIDTICKER';
	const newFund = {
		ticker: 'SPY',
		name: 'SPDR S&P 500 ETF'
	};

	return request(app)
		.patch(`/api/funds/${invalidTicker}`)
		.send(newFund)
		.expect(404)
});

test('should remove fund', () => {
	return request(app)
		.delete(`/api/funds/${fundOne.ticker}`)
		.send()
		.then(res => Fund.findOne({ ticker: res.body.ticker }))
		.then(fund => expect(fund).toBeFalsy());
});

test('should not remove anything if nonexistent fund', () => {
	const invalidTicker = 'INVALIDTICKER';

	return request(app)
		.delete(`/api/funds/${invalidTicker}`)
		.send()
		.expect(404)
});