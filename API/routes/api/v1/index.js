const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../../models/Campaign');
require('../../../models/Donation');
const Campaign = mongoose.model('Campaign');
const Donation = mongoose.model('Donation');

//Root route
router.get('/', (req, res) => {
    res.send('Root API route');
});

//Get all campaigns in database
router.get('/campaigns', async (req, res) => {
    //Using mongoose
    const filter = {};
    const campaigns = await Campaign.find(filter);
    //console.log(campaigns);
    res.json(campaigns);
}); 

//Get a specific campaign based on id
router.get('/campaigns/:id', async (req, res) => {
    //Using mongoose
    const campaignId = req.params.id;
    const filter = { _id: campaignId };
    const campaign = await Campaign.findOne(filter);
    // Fetch related donations
    const donations = await Donation.find({ campaign_id: campaignId });
    // Combine campaign and donations data
    const result = {
        campaign: campaign,
        donations: donations
    };
    //console.log(result);
    res.json(result);
});

module.exports = router;