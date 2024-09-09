const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Import User and Donation models
const User = require('../../../models/User');
const Donation = require('../../../models/Donation');

// Routes

router.get('/', (req, res) => {
    res.send('Root API route for users');
});

router.post('/login', 
    passport.authenticate('login', { session: false, failWithError: true}),
    function (req, res) {
        console.log(req.user);
        const payload = { id: req.user._id, email: req.user.email }
        const token = jwt.sign( { payload }, process.env.TOP_SECRET_KEY, { expiresIn: '1d'});
        loginObject = {};
        loginObject._id = req.user._id;
        loginObject.email = req.user.email;
        loginObject.accessToken = token;
        console.log(loginObject);
        return res.status(200).json(loginObject);
    },
    function (err, req, res) {
        errorResponse = {
            "error": {
                "name": "LoginError"
            },
            "message": "User not found",
            "statusCode": 401,
            "data": [],
            "success": false
        }
        return res.status(401).json(errorResponse);
    }
);

router.get('/user', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/donations', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const userId = req.user.id;
        const donations = await Donation.find({ user_id: userId })
            .populate('campaign_id', 'name')
            .exec();

        res.json(donations);
    } catch (error) {
        console.error('Error fetching user donations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
