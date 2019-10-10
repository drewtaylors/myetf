import Record from '../models/record.model';
import Fund from '../models/fund.model';
import Stock from '../models/stock.model';

const findRecordByFundAndStock = (fundTicker, stockTicker) => {
  return new Promise((resolve, reject) => {
    const searchParams = {}

    Fund
      .findOne({ ticker: fundTicker })
      .then((fund) => {
        if (!fund) {
          reject({
            error: 'No fund found.'
          });
        }
        searchParams.fund = fund._id;
        return Stock.findOne({ ticker: stockTicker });
      })
      .then((stock) => {
        if (!stock) {
          reject({
            error: 'No stock found.'
          });
        }
        searchParams.stock = stock._id;
        return Record.find(searchParams).populate('fund').populate('stock');
      })
      .then((record) => {
        if (!record) {
          reject({
            error: 'No record found.'
          });
        } else {
          resolve(record);
        }
      })
      .catch((err) => reject(err));
  })
};

const findRecordByFund = (fundTicker) => {
  return new Promise((resolve, reject) => {
    const searchParams = {}

    Fund
      .findOne({ ticker: fundTicker })
      .then((fund) => {
        if (!fund) {
          reject({
            error: 'No fund found.'
          });
        }
        searchParams.fund = fund._id;
        return Record.find(searchParams).populate('fund').populate('stock');
      })
      .then((record) => {
        if (!record) {
          reject({
            error: 'No record found.'
          });
        } else {
          resolve(record);
        }
      })
      .catch((err) => reject(err));
  })
}

const findRecordByStock = (stockTicker) => {
  return new Promise((resolve, reject) => {
    const searchParams = {}

    Stock
      .findOne({ ticker: stockTicker })
      .then((stock) => {
        if (!stock) {
          reject({
            error: 'No stock found.'
          });
        }
        searchParams.stock = stock._id;
        return Record.find(searchParams).populate('fund').populate('stock');
      })
      .then((record) => {
        if (!record) {
          reject({
            error: 'No record found.'
          });
        } else {
          resolve(record);
        }
      })
      .catch((err) => reject(err));
  })
}

export {
  findRecordByFundAndStock,
  findRecordByFund,
  findRecordByStock,
};