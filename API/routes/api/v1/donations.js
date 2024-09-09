const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('models/Campaign');
const Campaign = mongoose.model('Campaign');
require('models/Donation');
const Donation = mongoose.model('Donation');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Helper function to get prod/dev client/api URL
const getURL = (app) => {
    if (process.env.NODE_ENV === 'production'){
        if (app === 'client') {
            return process.env.PROD_CLIENT_URL;
        } else {
            return process.env.PROD_API_URL;
        }
    } else {
        if (app === 'client') {
            return process.env.DEV_CLIENT_URL;
        } else {
            return process.env.DEV_API_URL;
        }
    }
};

router.get('/', async (req, res) => {
    const filter = {};
    const donations = await Donation.find(filter);
    res.status(200).json(donations);
});

router.post('/new', async (req, res) => {
    const { campaign_id, amount } = req.body;
    const now = new Date();
    const donationObject = {
        campaign_id: mongoose.Types.ObjectId(campaign_id),
        amount: amount,
        date: now
    };

    await Donation.create(donationObject)
        .then(() => {
            res.status(200).send('OK');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error creating donation');
        });
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId; // Corrected from req.params.id to req.params.userId
    try {
        // Find donations matching the user ID
        const donations = await Donation.find({ user_id: userId }); // Assuming user ID is stored as user_id in the Donation model

        // Send the donations as the response
        res.json(donations);
    } catch (err) {
        // If an error occurs, send an error response
        console.error('Error fetching donations:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/create_checkout', async (req, res) => {
    console.log(req.body);
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: req.body.campaign_name
              },
              unit_amount: req.body.donation_amount
            },
            quantity: 1
          },
        ],
        mode: 'payment',
        success_url: `${getURL('api')}/donations/donation_success?success=true&session_id={CHECKOUT_SESSION_ID}&campaign_id=${req.body.campaign_id}`,
        cancel_url: `${getURL('client')}`,
        metadata: {
            campaign_id: req.body.campaign_id
        }
      });

      console.log(session);

      res.redirect(303, session.url);
});

router.get('/donation_success', async (req, res) => {
    // View the entire querystring
    console.log(req.query);

    // Retrieve the checkout session from the Stripe API
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    // View the entire session object returned by Stripe
    console.log(session);

    // Retrieve the campaign_id (metadata or querystring)
    console.log(session.metadata.campaign_id);
    console.log(req.query.campaign_id);

    // TODO: Add a donation record to the database
    // (REMEMBER) the amount_total is in CENTS and not DOLLARS
    const donation_amount = session.amount_total/100;

    // Construct a URL to the front end to deliver the user
    const clientURL = `${getURL('client')}/donation_success?campaign_id=${session.metadata.campaign_id}&donation_amount=${donation_amount}`;

    // Redirect the user
    res.redirect(303, clientURL);
});

module.exports = router;