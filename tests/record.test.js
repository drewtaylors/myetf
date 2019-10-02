import request from 'supertest';
import mongoose from 'mongoose';

import app from '../src/app';
import Record from '../src/models/record.model';
import {
  fundOne,
  fundOneId,
  stockOne,
  stockTwoId,
  recordOne,
	setupDatabase
} from './fixtures/db';

beforeEach(() => {
	return setupDatabase();
});

// Constants used throughout tests
const newRecord = {
	stock: stockTwoId,
  fund: fundOneId,
  percentage: 0.17
};
const invalidId = new mongoose.Types.ObjectId();

test('should add a new record', () => {
  return request(app)
    .post('/api/records')
    .send(newRecord)
    .expect(201);
});

test('should add the correct record', () => {
  return request(app)
    .post('/api/records')
    .send(newRecord)
    .then(res => Record.findOne({ _id: res.body._id }))
    .then(record => expect(record).toMatchObject(newRecord));
});

test('should fetch all records', () => {
	return request(app)
		.get('/api/records')
		.send()
		.then(res => expect(res.body).toHaveLength(3));
});

test('should fetch record by ID', () => {
	return request(app)
		.get(`/api/records/${recordOne._id}/`)
		.send()
		.then(res => expect(res.body).toMatchObject({
			fund: recordOne.fund.toString(),
      stock: recordOne.stock.toString(),
      percentage: recordOne.percentage
		}));
});

test('should throw error when nonexistent fund', () => {
	return request(app)
		.get(`/api/records/${invalidId}`)
		.send()
		.expect(404);
});

test('should update record', () => {
	return request(app)
		.patch(`/api/records/${recordOne._id}`)
		.send(newRecord)
		.then(res => Record.findOne({ _id: res.body._id }))
		.then(record => expect(record).toMatchObject(newRecord));
});

test('should not update anything if nonexistent record', () => {
	return request(app)
		.patch(`/api/records/${invalidId}`)
		.send(newRecord)
		.expect(404);
});

test('should remove record', () => {
	return request(app)
		.delete(`/api/records/${recordOne._id}`)
		.send()
		.then(res => Record.findOne({ _id: recordOne._id }))
		.then(fund => expect(fund).toBeNull());
});

test('should not remove anything if nonexistent records', () => {
	return request(app)
		.delete(`/api/records/${invalidId}`)
		.send()
		.expect(404);
});
