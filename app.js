// app.js
import 'dotenv/config'
import express from 'express';
import scrapeRouter from './index.js'; // Import the logic from index.js
import process from 'node:process';

const app = express();

// Use the scrapeRouter for /api routes
app.use('/api', scrapeRouter);

// Set the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
