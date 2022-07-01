const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

// #c301 >> this is the middleware
// @route   /controllers/priceController 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/prices', require('./routes/priceRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// middleware that overwrites the default express error handler
// @route   /middleware/errorMiddleware
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))