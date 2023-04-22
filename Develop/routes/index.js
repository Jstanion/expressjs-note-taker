// Import helper utilities and packages
const notes = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');


// Create a GET route that retrieves all saved notes as JSON
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// Create a POST route that saves a new note in response to a Save icon click
notes.post('/', (req, res) => {
  console.log(req.body);
  const { title, text} = req.body;
  const newNote = {
    title,
    text,
    note_id: uuid()
  };

  readAndAppend(newNote, './db/db.json');
  res.json('Success: New note was added.');
})

// Create a GET route that retrieves a single note by its ID and displays it in the right-hand column


// Create a DELETE route that removes a note by its ID


// Create a PUT route that updates a note by its ID


module.exports = notes