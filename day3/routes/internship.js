const express = require('express');
const router = express.Router();
const Internship = require('../models/internship');

// Create new internship entry
router.post('/create', async (req, res) => {
    try {
        const internship = new Internship(req.body);
        await internship.save();
        res.status(201).json({
            success: true,
            data: internship
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Get all internships
router.get('/all', async (req, res) => {
    try {
        const internships = await Internship.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: internships
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router; 