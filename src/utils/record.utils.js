import Record from '../models/record.model';
import Fund from '../models/fund.model';
import Stock from '../models/stock.model';

const findRecordsByFundAndStock = (fundTicker, stockTicker) => {
  return new Promise((resolve, reject) => {
    const searchParams = {}

    Fund
      .findOne({ ticker: fundTicker })
      .then((fund) => {
        if (!fund) {
          reject({ error: 'No fund found.' });
        }
        searchParams.fund = fund._id;
        return Stock.findOne({ ticker: stockTicker });
      })
      .then((stock) => {
        if (!stock) {
          reject({ error: 'No stock found.' });
        }
        searchParams.stock = stock._id;
        return Record.find(searchParams).populate('fund').populate('stock');
      })
      .then((records) => {
        if (!records) {
          reject({ error: 'No records found.' });
        } else {
          resolve(records);
        }
      })
      .catch((err) => reject(err));
  })
};

const findRecordsByFund = (fundTicker) => {
  return new Promise((resolve, reject) => {
    const searchParams = {}

    Fund
      .findOne({ ticker: fundTicker })
      .then((fund) => {
        if (!fund) {
          reject({ error: 'No fund found.' });
        }
        searchParams.fund = fund._id;
        return Record.find(searchParams).populate('fund').populate('stock');
      })
      .then((records) => {
        if (!records) {
          reject({ error: 'No records found.' });
        } else {
          resolve(records);
        }
      })
      .catch((err) => reject(err));
  })
}

const findRecordsByStock = (stockTicker) => {
  return new Promise((resolve, reject) => {
    const searchParams = {}

    Stock
      .findOne({ ticker: stockTicker })
      .then((stock) => {
        if (!stock) {
          reject({ error: 'No stock found.' });
        }
        searchParams.stock = stock._id;
        return Record.find(searchParams).populate('fund').populate('stock');
      })
      .then((records) => {
        if (!records) {
          reject({ error: 'No records found.' });
        } else {
          resolve(records);
        }
      })
      .catch((err) => reject(err));
  })
}

const findRecords = () => {
  return new Promise((resolve, reject) => {
    Record
      .find()
      .populate('fund')
      .populate('stock')
      .then((records) => {
        if (!records) {
          reject({ error: 'No records found.' });
        } else {
          resolve(records);
        }
      })
      .catch((err) => reject(err));
  })
}

export {
  findRecordsByFundAndStock,
  findRecordsByFund,
  findRecordsByStock,
  findRecords
};