import Fund from '../models/fund.model';

const list = (req, res) => {
	Fund
		.find()
    .then(funds => res.json(funds))
		.catch(err => res.status(500).json(err));
};

const create = (req, res) => {
	Fund
		.create({ ...req.body })
		.then(fund => res.status(201).json(fund))
		.catch(err => res.status(400).json(err));
};

const detail = (req, res) => {
	Fund
		.findOne({ ticker: req.params.ticker })
		.then(fund => fund ? res.json(fund) : res.status(404).send())
		.catch(err => res.status(500).send(err));
};

const update = (req, res) => {
	Fund
		.findOneAndUpdate({ 
			ticker: req.params.ticker
		}, {
			...req.body
		}, {
			new: true,
			omitUndefined: true
		})
		.then(fund => fund ? res.send(fund) : res.status(404).send())
		.catch(err => res.status(500).send(err));
}

const remove = (req, res) => {
	Fund
		.findOneAndDelete({ ticker: req.params.ticker })
		.then(fund => fund ? res.send(fund) : res.status(404).send())
		.catch(err => res.status(500).send(err));
}

export {
	list,
	create,
	detail,
	update,
	remove
};
