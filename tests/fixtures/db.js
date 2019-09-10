import mongoose from 'mongoose';

import Fund from '../../src/models/fund.model';

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

const setupDatabase = () => {
  return new Promise((resolve, reject) => { 
    Fund
      .deleteMany()
      .then(() => new Fund(fundOne).save())
      .then(() => new Fund(fundTwo).save())
      .then(() => resolve(true))
      .catch(err => reject(err));
  });
};

export {
  fundOne,
  fundTwo,
  setupDatabase
};