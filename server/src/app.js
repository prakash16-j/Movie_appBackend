const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
require('express-async-errors')

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/health', (req, res) => res.json({ status: 'ok' }))

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/movies', require('./routes/movies'))
app.use('/api/reviews', require('./routes/reviewRoutes')) 
app.use('/api/users', require('./routes/userRoutes'))

// Error handler
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ message: err.message || 'Server error' })
})

module.exports = app
