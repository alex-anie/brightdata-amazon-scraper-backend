import express from 'express';
import scrapeRouter from './index.js'; // Import the logic from index.js

const app = express();

// Use the scrapeRouter for /api routes
app.use('/api', scrapeRouter);

// Set the port
const PORT = 4040;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
