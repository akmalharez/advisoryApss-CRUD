const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Import cors
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');
const sequelize = require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (you can restrict this to your frontend's origin later)
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', authRoutes);
app.use('/api/listing', listingRoutes);
app.use("/api/auth", authRoutes);

// Test database connection
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Unable to connect to database:', err));

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
