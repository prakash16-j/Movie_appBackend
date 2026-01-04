const Queue = require('bull')

const movieInsertQueue = new Queue('movie-insert', {
    redis: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
    },
})

module.exports = movieInsertQueue
