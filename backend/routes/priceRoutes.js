const express = require('express')
const router = express.Router()
const { getPrices, savePrice, updatePrice, deletePrice } = require('../controllers/priceController')
const { protect } = require('../middleware/authMiddleware')

// only needs '/' because /app/prices is already specified in /server.js
// @route   /controllers/priceController

// A -> router.get('/', getPrices)
// B -> router.post('/', savePrice)
// line below chains A and B
router.route('/').get(protect, getPrices).post(protect, savePrice)
router.route('/:id').put(protect, updatePrice).delete(protect, deletePrice)

module.exports = router