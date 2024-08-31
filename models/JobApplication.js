const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    resume: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
