// using async since mongoose returns a promise
// Error hanlder via 'express-async-handler' instead of try-catch

const asyncHandler = require('express-async-handler')

const Price = require('../models/priceModel')
const User = require('../models/userModel')

// @desc    Get prices
// @route   GET /api/prices
// @access  Private
const getPrices = asyncHandler(async (req, res) => {
    const prices = await Price.find({ user: req.user.id })

    res.status(200).json(prices)
})

// @desc    Save price
// @route   POST /api/prices
// @access  Private
const savePrice = asyncHandler(async (req, res) => {
    // #c301 >> to use body data you need to add middleware in /server.js 

    // ******** ISSUE **********
    // POST REQUEST NOT SAVING PROPERLY TO MONGODB
    // THROWS ERROR BELOW "PLEASE ADD A TEXT FIELD"
    // HOW TO LINK PRICE SCHEMA TO PRICE CONTROLLER ???
    if(!req.body.itemPrice) {
        res.status(400)
        throw new Error('Please add price')
    }

    const price = await Price.create({
        // .text regardless of type? (works with number)
        // @route /models/priceModel
        itemPrice: {
          priceAmount: req.body.itemPrice.priceAmount,
          priceCurrency: req.body.itemPrice.priceCurrency,
        },
        itemQuantity: {
          quantityAmount: req.body.itemQuantity.quantityAmount,
          quantityUnit: req.body.itemQuantity.quantityUnit,
        },
        tags: req.body.tags,
        user: req.user.id,
    })

    res.status(200).json(price)
})

// @desc    Update price
// @route   PUT /api/price/:id
// @access  Private
const updatePrice = asyncHandler(async (req, res) => {
    const price = await Price.findById(req.params.id)

    if(!price) {
        res.status(400)
        throw new Error('Price not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user matches the price user
    if(price.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedPrice = await Price.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedPrice)
})

// @desc    Delete price
// @route   DELETE /api/prices/:id
// @access  Private
const deletePrice = asyncHandler(async (req, res) => {
    const price = await Price.findById(req.params.id)

    if(!price) {
        res.status(400)
        throw new Error('Price not found')
    }

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure logged in user matches the price user
    if(price.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await price.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPrices,
    savePrice,
    updatePrice,
    deletePrice
}
