const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    campaign_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign', // Assuming you have a Campaign model
        required: true
    },
    message: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Donation = mongoose.model('Donation', DonationSchema);

module.exports = Donation;