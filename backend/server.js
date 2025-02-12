const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;  // Update this if necessary

// Enable CORS for local development
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from React app on localhost
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Your routes and server code go here
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
