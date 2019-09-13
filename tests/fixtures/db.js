import mongoose from 'mongoose';

import Fund from '../../src/models/fund.model';
import Stock from '../../src/models/stock.model';
import Record from '../../src/models/record.model';

const fundOneId = new mongoose.Types.ObjectId();
const fundOne = {
  _id: fundOneId,
  ticker: 'QQQ',
  name: 'Invesco QQQ'
};

const fundTwoId = new mongoose.Types.ObjectId();
const fundTwo = {
  _id: fundTwoId,
  ticker: 'IWM',
  name: 'iShares Russell 2000'
};

const stockOneId = new mongoose.Types.ObjectId();
const stockOne = {
  _id: stockOneId,
  ticker: 'MSFT',
  name: 'Microsoft Corporation',
  tags: [
    'Information Technology',
    'Software and Services',
    'Software',
    'Systems Software',
    'Development Tools'
  ]
};

const stockTwoId = new mongoose.Types.ObjectId();
const stockTwo = {
  _id: stockTwoId,
  ticker: 'XOM',
  name: 'Exxon Mobil Corporation',
  tags: [
    'Energy',
    'Energy',
    'Oil, Gas and Consumable Fuels',
    'Integrated Oil and Gas'
  ]
};

const stockThreeId = new mongoose.Types.ObjectId();
const stockThree = {
  _id: stockThreeId,
  ticker: 'MSFT',
  name: 'Microsoft Corporation',
  tags: [
    'Information Technology',
    'Software and Services',
    'Software',
    'Systems Software',
    'Development Tools'
  ]
};

const recordOneId = new mongoose.Types.ObjectId();
const recordOne = {
  _id: recordOneId,
  stock: stockOneId,
  fund: fundOneId,
  percentage: 1.20
};

const recordTwoId = new mongoose.Types.ObjectId();
const recordTwo = {
  _id: recordTwoId,
  stock: stockTwoId,
  fund: fundTwoId,
  percentage: 3.03
};

const recordThreeId = new mongoose.Types.ObjectId();
const recordThree = {
  _id: recordThreeId,
  stock: stockOneId,
  fund: fundTwoId,
  percentage: 10
};

const setupDatabase = () => {
  return new Promise((resolve, reject) => {
    Fund
      .deleteMany()
      .then(() => Stock.deleteMany())
      .then(() => Record.deleteMany())
      .then(() => new Fund(fundOne).save())
      .then(() => new Fund(fundTwo).save())
      .then(() => new Stock(stockOne).save())
      .then(() => new Stock(stockTwo).save())
      .then(() => new Stock(stockThree).save())
      .then(() => new Record(recordOne).save())
      .then(() => new Record(recordTwo).save())
      .then(() => new Record(recordThree).save())
      .then(() => resolve(true))
      .catch(err => reject(err));
  });
};

export {
  fundOne,
  fundTwo,
  fundOneId,
  fundTwoId,
  stockOne,
  stockTwo,
  stockOneId,
  stockTwoId,
  setupDatabase
};
