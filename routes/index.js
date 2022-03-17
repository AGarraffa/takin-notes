const express = require('express');
const notes = require('./notes');
const api = express();

api.use('/notes', notes);

module.exports = api;