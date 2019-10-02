import Record from '../models/record.model';

const list = (req, res) => {
  Record
    .find()
    .then(records => res.json(records))
    .catch(err => res.status(500).json(err));
};

const create = (req, res) => {
  Record
    .create({ ...req.body })
    .then(record => res.status(201).json(record))
    .catch(err => res.status(400).json(err));
};

const detail = (req, res) => {
  Record
    .findOne({ _id: req.params.id })
    .then(record => record ? res.json(record) : res.status(404).send())
    .catch(err => res.status(500).json(err));
};

const update = (req, res) => {
  Record
    .findOneAndUpdate({
      _id: req.params.id
    }, {
      ...req.body
    }, {
      new: true,
      omitUndefined: true
    })
    .then(record => record ? res.send(record) : res.status(404).send())
    .catch(err => res.status(500).send(err));
};

const remove = (req, res) => {
  Record
    .findOneAndDelete({ _id: req.params.id })
    .then(record => record ? res.send(record) : res.status(404).send())
    .catch(err => res.status(500).send(err));
};

// const list = (req, res) => {
//   Fund
//     .find()
//     .then(funds => res.json(funds))
//     .catch(err => res.status(500).json(err));
// };

// const create = (req, res) => {
//   Fund
//     .create({ ...req.body })
//     .then(fund => res.status(201).json(fund))
//     .catch(err => res.status(400).json(err));
// };

// const detail = (req, res) => {
//   Fund
//     .findOne({ ticker: req.params.ticker })
//     .then(fund => fund ? res.json(fund) : res.status(404).send())
//     .catch(err => res.status(500).send(err));
// };

// const update = (req, res) => {
//   Fund
//     .findOneAndUpdate({ 
//       ticker: req.params.ticker
//     }, {
//       ...req.body
//     }, {
//       new: true,
//       omitUndefined: true
//     })
//     .then(fund => fund ? res.send(fund) : res.status(404).send())
//     .catch(err => res.status(500).send(err));
// }

// const remove = (req, res) => {
//   Fund
//     .findOneAndDelete({ ticker: req.params.ticker })
//     .then(fund => fund ? res.send(fund) : res.status(404).send())
//     .catch(err => res.status(500).send(err));
// }

export {
  list,
  create,
  detail,
  update,
  remove
};
