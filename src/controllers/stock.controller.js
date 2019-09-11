import Stock from '../models/stock.model';

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
		.findById(req.params.id)
		.then(stock => stock ? res.json(stock) : res.status(404).send())
}

const update = (req, res) => {
	Stock
		.findByIdAndUpdate(req.params.id, {
			...req.body
		}, {
			new: true,
			omitUndefined: true
		})
		.then(stock => stock ? res.send(stock) : res.status(404).send())
		.catch(err => res.status(500).send(err));
}

const remove = (req, res) => {
	Stock
		.findByIdAndDelete(req.params.id)
		.then(stock => stock ? res.send(stock) : res.status(404).send())
		.catch(err => res.status(500).send(err));
}

export {
  list,
	create,
	detail,
	update,
	remove
}