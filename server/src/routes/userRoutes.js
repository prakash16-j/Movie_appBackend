const express = require('express');
const router = express.Router();
const { toggleWatchlist, getWatchlist } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

// POST /api/users/watchlist -> Add or Remove movie (Protected)
router.post('/watchlist', authenticate, toggleWatchlist);

// GET /api/users/watchlist -> Get user's saved movies (Protected)
router.get('/watchlist', authenticate, getWatchlist);

module.exports = router;