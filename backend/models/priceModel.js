// here we define the SCHEMA
const mongoose = require('mongoose')

const priceSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Please add an amount']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Price', priceSchema)