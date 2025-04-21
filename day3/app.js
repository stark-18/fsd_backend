const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const internshipRoutes = require("./routes/internship");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/internship-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/internship', internshipRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Internship Tracker API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
