// Import helper utilities and packages
const notes = require('express').Router();
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsutils');
  const { v4: uuidv4 } = require('uuid');


// GET route that retrieves all saved notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// POST route that saves a new note in response to a Save icon click
notes.post('/', (req, res) => {
  console.log(req.body);
  const { title, text} = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4()
  };

  // Calls the readAndAppend function to add new note to file
  readAndAppend(newNote, './db/db.json');
  res.json('Success: New note was added.');
})

// GET route that retrieves a single note by its ID
notes.get('/:id', (req, res) => {
  const noteId = req.params.id;

  // Calls the readFromFile function to pull existing data from the desired filepath
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const response = json.find((note) => note.id === noteId);
      res.send(response);
      console.log('Successfully retrieved note', response)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving note');
    });
})

// DELETE route that removes a note by its ID
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;

  // Calls the readFromFile function to pull existing data from the desired filepath and filters out the note ID's that do not match the provided ID
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const response = json.filter((note) => note.id !== noteId);

      // Calls the writeFile function to rewrite the new file that no longer includes the deleted note
      writeToFile('./db/db.json', response);
      res.send()
      console.log('Successfully removed note', response)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error retrieving note');
    });
})

module.exports = notes