const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const questionsRoute = require('./routes/questions');

dotenv.config(); // Load .env file
console.log('✅ MONGO_URI:', process.env.MONGO_URI); // Debug check

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/questions', questionsRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
