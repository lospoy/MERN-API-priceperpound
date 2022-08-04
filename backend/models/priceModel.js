// here we define the price SCHEMA
const mongoose = require('mongoose')

const priceSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        // PRICE OF THE ITEM AND CURRENCY
        itemPrice: {
            // price of the item must be stored in cents to avoid floats
            type: Object,
            required: [true, 'Item price required'],
            properties: {
              priceAmount: {
                type: Number,
                required: [true, 'Price amount must be specified'],
              },
              priceCurrency: {
                type: String,
                required: [true, 'Price currency must be specified'],
              }
            }
        },
        // MEASUREMENT UNIT AND THE AMOUNT
        itemQuantity: {
          type: Object,
          required: [true, 'Item quantity required'],
          properties: {
            quantityAmount: {
              type: Number,
              required: [true, 'Quantity amount required'],
            },
            quantityUnit: {
              type: String,
              required: [true, 'Unit of measure must be specified'],
            },
          }
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