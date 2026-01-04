const User = require('../models/User');

exports.toggleWatchlist = async (req, res) => {
    try {
        const { movieId } = req.body;
        const user = await User.findById(req.user.id);
        
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isAdded = user.watchlist.includes(movieId);
        if (isAdded) {
            user.watchlist.pull(movieId);
        } else {
            user.watchlist.addToSet(movieId);
        }

        await user.save();
        res.json({ 
            message: isAdded ? "Removed from watchlist" : "Added to watchlist",
            watchlist: user.watchlist 
        });
    } catch (err) {
        res.status(500).json({ message: 'Error updating watchlist' });
    }
};

exports.getWatchlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('watchlist');
        res.json(user.watchlist);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching watchlist' });
    }
};