const Review = require('../models/reviewModel');

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
