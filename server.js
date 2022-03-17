const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const noteData = require('./db/db.json');
const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

// GET Route for note data
app.get('/api/notes', (req, res) => res.json(noteData));


// POST route for notes
app.post('/api/notes', async (req, res) => {

  const { title, text } = req.body;

  // checks to make sure all text fields are present
  if (title && text) {

    console.log('All notes:');
    console.log(noteData);

    const newNote = {
      title: title,
      text: text
    };

    // pushes the new note to the array of all notes
    noteData.push(newNote);

    console.log('New Notes:');
    console.log(noteData);

    // turns noteData in to a string
    noteStr = JSON.stringify(noteData)

    // writes all notes to the file (overwriting the existing file)
    await fs.writeFile('./db/db.json', noteStr);

    // if (file.ok) {
    //   console.log('file written successfully');
      res.status(200).json(noteData);
    // }

    // else {
    //   res.status(500).json(file)
    // }

  };

})

// GET route for 404 error
app.get('/*', (req, res) => res.status(404).sendFile(path.join(__dirname, '/public/404.html'))); 

// listens on PORT
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


// TODO: 
// currently notes not rendering when you press the save button (re-run the render function on press)
// include logic to display the note when selected (maybe allow it to be edited?)
// logic to ensure that db.json is an array (if it doesn't exist or if it's formatted incorrectly)
// break the functions off of server.js and in to routes.js
// delete functionality
// create a 404 page

// line 26-62 should be in the routes folder