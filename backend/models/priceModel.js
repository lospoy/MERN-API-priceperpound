// here we define the price SCHEMA
const mongoose = require('mongoose')

const priceSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        itemPrice: {
            // price of the item stored in cents to avoid floats
            type: Number,
            required: [true, 'Item price required'],
        },
        priceCurrency: {
            type: String,
            required: [true, 'Currency must be specified'],
        },
        itemQuantity: {
            type: Number,
            required: [true, 'Quantity required'],
        },
        quantityUnit: {
            type: String,
            required: [true, 'Unit of measure must be specified'],
        },
        tags: {
            type: String,
            required: [true, 'Please enter at least one tag'],
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Price', priceSchema)