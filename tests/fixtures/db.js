import mongoose from 'mongoose';

import Fund from '../../src/models/fund.model';
import Stock from '../../src/models/stock.model';

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
  fund: fundOneId,
  tags: [
    'Information Technology',
    'Software and Services',
    'Software',
    'Systems Software',
    'Development Tools'
  ],
  proportionOfFund: 4.32
};

const stockTwoId = new mongoose.Types.ObjectId();
const stockTwo = {
  _id: stockTwoId,
  ticker: 'XOM',
  name: 'Exxon Mobil Corporation',
  fund: fundTwoId,
  tags: [
    'Energy',
    'Energy',
    'Oil, Gas and Consumable Fuels',
    'Integrated Oil and Gas'
  ],
  proportionOfFund: 1.20
};

const setupDatabase = () => {
  return new Promise((resolve, reject) => {
    Fund
      .deleteMany()
      .then(() => Stock.deleteMany())
      .then(() => new Fund(fundOne).save())
      .then(() => new Fund(fundTwo).save())
      .then(() => new Stock(stockOne).save())
      .then(() => new Stock(stockTwo).save())
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
