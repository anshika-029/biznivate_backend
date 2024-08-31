const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    roleOverview: { 
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    primaryResponsibilities: { 
        type: [String], 
        required: true
    },
    experience: { 
        type: Number,
        required: true
    },
    numberOfVacancies: { 
        type: Number,
        required: true
    },
    workingHours: { // for working hours (e.g., "9 AM - 6 PM")
        type: String,
        required: true
    },
    workingDays: { // for working days (e.g., "Monday to Friday")
        type: String,
        required: true
    },
    salary: { // for salary (e.g., "50,000 - 70,000 per annum")
        type: String,
        required: true
    },
    deadline: { // application deadline
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Career', careerSchema);
