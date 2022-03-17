const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
// allows use of routes from ./routes/index.js
app.use('/api', api);

// GET route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// GET route for 404 error
app.get('/*', (req, res) => res.status(404).sendFile(path.join(__dirname, '/public/404.html'))); 

// listens on PORT
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
