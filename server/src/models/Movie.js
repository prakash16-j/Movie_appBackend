const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        rating: { type: Number, default: 0 },
        releaseDate: { type: Date },
        duration: { type: String },
        imdbId: { type: String, index: true, unique: false },
        poster: { type: String, default: '' },
         genre: {
      type: String,
      required: true, // 🔥 IMPORTANT
      enum: ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Romance'],
    },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Movie', movieSchema)
