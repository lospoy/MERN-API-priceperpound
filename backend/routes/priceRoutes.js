const express = require('express')
const router = express.Router()
const { getPrices, savePrice, updatePrice, deletePrice } = require('../controllers/priceController')

// only needs '/' because /app/prices is already specified in /server.js
// @route   /controllers/priceController

// A -> router.get('/', getPrices)
// B -> router.post('/', savePrice)
// line below chains A and B
router.route('/').get(getPrices).post(savePrice)
router.route('/:id').put(updatePrice).delete(deletePrice)

module.exports = router