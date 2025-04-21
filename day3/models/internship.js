const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    stipend: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Applied', 'In Progress', 'Completed'],
        default: 'Applied'
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Internship', internshipSchema); 