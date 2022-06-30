// using async since mongoose returns a promise
// NOT using try-catch, but error hanlder via 'express-async-handler'

const asyncHandler = require('express-async-handler')

const Price = require('../models/priceModel')

// @desc    Get prices
// @route   GET /api/prices
// @access  Private
const getPrices = asyncHandler(async (req, res) => {
    const prices = await Price.find()

    res.status(200).json(prices)
})

// @desc    Save price
// @route   POST /api/prices
// @access  Private
const savePrice = asyncHandler(async (req, res) => {
    // #c301 >> to use body data you need to add middleware in /server.js 
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const price = await Price.create({
        // .text regardless of type? (works with number)
        // @route /models/priceModel
        amount: req.body.text
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

    const updatedPrice = await Price.findByIdAndUpdate(req.params.id, req.body, { new: true })

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

    await price.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPrices,
    savePrice,
    updatePrice,
    deletePrice
}