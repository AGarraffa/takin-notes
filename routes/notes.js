const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid'); 


// GET route for note data
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

// POST route for note data
notes.post('/', (req, res) => {

    const { title, text } = req.body;
  
    // checks to make sure all text fields are present
    if (title && text) {
  
      const newNote = {
        title,
        text,
        id: uuid()
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    }
  
      else {
        res.error('Error in adding note')
      }
  
  });
  

  
// DELETE route for notes; move to notes route
notes.delete('/:id', (req, res) => {
  
    const { id } = req.params;
  
    readFromFile('./db/db.json').then((data) => {
  
      data = JSON.parse(data);
  
      for (let index = 0; index < data.length; index++) {
  
        const element = data[index];
  
        if (element.id === id) {
  
          data.splice(index, 1);
          
          break;
        }
      }
  
      writeToFile('./db/db.json', data);
      res.json(`Note deleted successfully`);
  
    })
  });

  module.exports = notes;