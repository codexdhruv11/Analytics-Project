require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// ✅ FIXED CORS: Allow all local origins during development
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); // Allow all origins for testing
  },
  methods: ['GET']
}));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ Connection error:', err));

// ✅ Schema and Model
const analyticsSchema = new mongoose.Schema({
  sales: Number,
  users: Number,
  bounce: Number,
  revenue: Number,
  timestamp: { type: Date, default: Date.now }
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

// ✅ API Endpoint: GET latest data
app.get('/api/data', async (req, res) => {
  try {
    const newData = new Analytics({
      sales: Math.floor(Math.random() * 10000) + 5000,
      users: Math.floor(Math.random() * 1000) + 500,
      bounce: Math.floor(Math.random() * 30) + 15,
      revenue: Math.floor(Math.random() * 50000) + 20000
    });

    await newData.save(); // Save to DB (optional for history)
    console.log('📈 Fresh random data sent:', newData);
    res.json(newData);
  } catch (err) {
    console.error('❌ Error generating data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Optional: Manual seed for testing
app.get('/api/seed', async (req, res) => {
  const newData = new Analytics({
    sales: Math.floor(Math.random() * 10000) + 5000,
    users: Math.floor(Math.random() * 1000) + 500,
    bounce: Math.floor(Math.random() * 30) + 15,
    revenue: Math.floor(Math.random() * 50000) + 20000
  });

  try {
    await newData.save();
    console.log('✅ New seed inserted');
    res.json(newData);
  } catch (err) {
    console.error('❌ Seed insert error:', err);
    res.status(500).json(err);
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
