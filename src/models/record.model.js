import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  fund: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fund'
  },
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock'
  },
  percentage: {
    type: Number
  }
}, {
	timestamps: true
});

const Record = mongoose.model('Record', recordSchema);

export default Record;
