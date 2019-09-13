import Fund from '../models/fund.model';
import Stock from '../models/stock.model';

const checkFundContainsStock = (req, res) => {
  const { fund, stock } = req.params
  Stock
    .find({ ticker: stock })
    .populate('fund')
    .then(stocks => {
      // console.log(stocks)
      res.status(200).send()
    })
}

export {
  checkFundContainsStock
}