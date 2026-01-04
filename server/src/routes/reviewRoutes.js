const express = require('express');
const router = express.Router();
const { addReview, getMovieReviews } = require('../controllers/reviewController');
const { authenticate } = require('../middlewares/auth');

// POST /api/reviews -> Add a review (Protected)
router.post('/', authenticate, addReview);

// GET /api/reviews/:movieId -> Get reviews for a specific movie (Public)
router.get('/:movieId', getMovieReviews);

module.exports = router;