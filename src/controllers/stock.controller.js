import Stock from '../models/stock.model';
import Fund from '../models/fund.model';

const list = (req, res) => {
	Stock
		.find()
    .then(stocks => res.json(stocks))
		.catch(err => res.status(500).json(err));
};

const create = (req, res) => {
	Stock
		.create({ ...req.body })
		.then(fund => res.status(201).json(fund))
		.catch(err => res.status(400).json(err));
};

const detail = (req, res) => {
	Stock
		.findOne({ ticker: req.params.ticker })
}

export {
  list,
  create,
}