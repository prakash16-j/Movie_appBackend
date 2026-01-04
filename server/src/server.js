const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
const mongoose = require('mongoose')
const app = require('./app')

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/moviedb'

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err)
        process.exit(1)
    })
