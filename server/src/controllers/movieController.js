const Movie = require('../models/Movie')

exports.getAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit
    const movies = await Movie.find().skip(skip).limit(limit)
    const total = await Movie.countDocuments()
    res.json({ data: movies, total, page, limit })
}

exports.getSorted = async (req, res) => {
    const { sortBy = 'title', order = 'asc' } = req.query
    const sort = { [sortBy]: order === 'asc' ? 1 : -1 }
    const movies = await Movie.find().sort(sort).limit(100)
    res.json({ data: movies })
}

exports.search = async (req, res) => {
    const { q } = req.query
    if (!q) return res.json({ data: [] })
    const regex = new RegExp(q, 'i')
    const movies = await Movie.find({ $or: [{ title: regex }, { description: regex }] }).limit(100)
    res.json({ data: movies })
}

exports.create = async (req, res) => {
    const payload = req.body
    const movie = await Movie.create(payload)
    res.status(201).json(movie)
}

exports.update = async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true })
    if (!movie) return res.status(404).json({ message: 'Not found' })
    res.json(movie)
}

exports.remove = async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByIdAndDelete(id)
    if (!movie) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Deleted' })
}
