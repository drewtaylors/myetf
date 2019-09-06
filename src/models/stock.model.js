const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
    ticker: {
        type: String,
    },
    fund: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fund'
    },
    tags: [{
        description: String
    }],
    proportionOfFund: {
        type: Number
    }
}, {
    timestamps: true
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock
