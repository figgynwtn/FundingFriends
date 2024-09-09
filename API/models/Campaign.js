const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const CampaignSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    goal: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
});

// Create the model
const Campaign = mongoose.model('Campaign', CampaignSchema);

// Export the model
module.exports = Campaign;