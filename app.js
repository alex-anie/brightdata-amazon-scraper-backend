import express from 'express';
import scrapeRouter from './index.js'; // Import the logic from index.js
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://brightdata-amazon-scraper-backend.onrender.com'], // Add your production website's URL
  optionsSuccessStatus: 200 // For legacy browsers
};

// Use CORS with the options
app.use(cors(corsOptions));

// Use the scrapeRouter for /api routes
app.use('/api', scrapeRouter);

// Set the port
const PORT = 4040;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
