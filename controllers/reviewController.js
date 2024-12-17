const Review = require('../models/reviewModel');

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.create({ rating, comment });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
