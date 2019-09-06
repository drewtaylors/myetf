import Fund from '../models/fund.model'

const list = (req, res) => {
  Fund.find()
    .then(funds => res.json({
			success: true,
			funds
		}))
		.catch(err => res.json({
			success: false,
			err
		}));
}

const create = (req, res) => {
	const { ticker, name } = req.body;
}

export { list };