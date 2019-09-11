const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    ticker: {
        type: String,
    },
    name: {
        type: String,
    },
    fund: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fund'
    },
    tags: {
        type: [String]
    },
    proportionOfFund: {
        type: Number
    }
}, {
    timestamps: true
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
