require('dotenv').config()
const mongoose = require('mongoose')
const queue = require('../src/utils/queue')
const Movie = require('../src/models/Movie')

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/moviedb'

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Worker connected to MongoDB'))
    .catch((err) => {
        console.error('Worker failed to connect to MongoDB', err)
        process.exit(1)
    })

queue.process(async (job) => {
    const payload = job.data
    if (Array.isArray(payload)) {
        await Movie.insertMany(payload)
    } else {
        await Movie.create(payload)
    }
    return Promise.resolve()
})

console.log('Queue worker started')
