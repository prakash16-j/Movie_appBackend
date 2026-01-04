const Review = require('../models/Review');

exports.addReview = async (req, res) => {
    try {
        const { movieId, rating, comment } = req.body;
        // req.user comes from your authenticate middleware
        const review = await Review.create({
            user: req.user.id, 
            movie: movieId,
            rating,
            comment
        });
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ message: 'Error adding review (Maybe you already reviewed this?)' });
    }
};

exports.getMovieReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ movie: req.params.movieId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};