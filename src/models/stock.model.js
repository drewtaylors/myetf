const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  ticker: {
    type: String,
  },
  name: {
    type: String,
  },
  tags: {
    type: [ String ]
  }
}, {
  timestamps: true
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
