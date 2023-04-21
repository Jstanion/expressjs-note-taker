// Define the required dependencies and initialize Express
const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./routes/index')

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to serve static files
app.use(express.static('public'));
app.use('/api', notes)

// Create a GET route for the notes page that serves a file with a list to the 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Wildcard route to direct users to the landing page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Start the server and listen for incoming requests
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);