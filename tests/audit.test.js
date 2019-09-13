import request from 'supertest';

import app from '../src/app';
import {
  fundOne,
  stockOne,
  setupDatabase
} from './fixtures/db';
  
beforeEach(() => {
  return setupDatabase();
})

test('should return the stock percentage of the fund', () => {
  return request(app)
    .get(`/api/audit/${fundOne.ticker}/${stockOne.ticker}`)
    .send()
    .expect(200)
    // .then(res => expect(res.body.percentage).toEqual(stockOne.proportionOfFund))
})