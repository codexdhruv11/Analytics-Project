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
  kpis: {
    totalSales: Number,
    averageOrderValue: Number,
    conversionRate: Number,
    customerCount: Number
  },
  salesTrend: [{
    date: String,
    value: Number
  }],
  regionalData: [{
    region: String,
    sales: Number,
    orders: Number
  }],
  deviceUsage: [{
    device: String,
    percentage: Number
  }],
  trafficSources: [{
    source: String,
    percentage: Number
  }],
  timestamp: { type: Date, default: Date.now }
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

// ✅ API Endpoint: GET latest data
app.get('/api/data', async (req, res) => {
  try {
    // Generate random data that matches the frontend's expected structure
    const totalSales = Math.floor(Math.random() * 100000) + 50000;
    const customerCount = Math.floor(Math.random() * 1000) + 500;
    
    const newData = {
      kpis: {
        totalSales,
        averageOrderValue: Math.floor(totalSales / customerCount),
        conversionRate: Math.random() * 0.3 + 0.1,
        customerCount
      },
      salesTrend: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        value: Math.floor(Math.random() * 10000) + 5000
      })).reverse(),
      regionalData: [
        { region: 'North America', sales: Math.floor(Math.random() * 50000) + 25000, orders: Math.floor(Math.random() * 500) + 250 },
        { region: 'Europe', sales: Math.floor(Math.random() * 40000) + 20000, orders: Math.floor(Math.random() * 400) + 200 },
        { region: 'Asia', sales: Math.floor(Math.random() * 30000) + 15000, orders: Math.floor(Math.random() * 300) + 150 },
        { region: 'Others', sales: Math.floor(Math.random() * 20000) + 10000, orders: Math.floor(Math.random() * 200) + 100 }
      ],
      deviceUsage: [
        { device: 'Desktop', percentage: Math.random() * 0.4 + 0.3 },
        { device: 'Mobile', percentage: Math.random() * 0.3 + 0.2 },
        { device: 'Tablet', percentage: Math.random() * 0.2 + 0.1 }
      ],
      trafficSources: [
        { source: 'Direct', percentage: Math.random() * 0.3 + 0.2 },
        { source: 'Search', percentage: Math.random() * 0.3 + 0.2 },
        { source: 'Social', percentage: Math.random() * 0.2 + 0.1 },
        { source: 'Referral', percentage: Math.random() * 0.2 + 0.1 }
      ]
    };

    const analyticsDoc = new Analytics(newData);
    await analyticsDoc.save(); // Save to DB (optional for history)
    
    console.log('📈 Fresh random data sent');
    res.json(newData);
  } catch (err) {
    console.error('❌ Error generating data:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
