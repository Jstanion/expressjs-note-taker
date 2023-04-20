// Define the required dependencies and initialize Express
const express = require('express');

const PORT = process.env.PORT || 3005;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Middleware to serve static files, such as HTML, CSS, and client-side JS files
app.use(express.static('public'));

// Create a GET route for the landing page that serves a file with a link to the notes page


// Create a GET route for the notes page that serves a file with a list of existing notes in the left-hand column and empty fields for new note title and text in the right-hand column


// Create a POST route that saves a new note in response to a Save icon click


// Create a GET route that retrieves a single note by its ID and displays it in the right-hand column


// Create a DELETE route that removes a note by its ID


// Create a PUT route that updates a note by its ID


// Start the server and listen for incoming requests