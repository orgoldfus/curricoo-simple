const express = require('express');
const router = express.Router();
const createCurricoo = require('./curricoo/create');
const getAllCurricoos = require('./curricoo/getAll');
const createEntry = require('./entry/create');
const getAllCurricooEntries = require('./entry/getAll');

// Get curricoo with entries
router.get('/curricoos/:curricooId', function(req, res, next) {
  res.sendStatus(200);
});

// Create a new curricoo
router.post('/curricoos', createCurricoo);

// Delete a curricoo
router.delete('/curricoos/:curricooId', function(req, res, next) {
  res.sendStatus(200);
});

// Edit a curricoo
router.post('/curricoos/:curricooId', function(req, res, next) {
  res.sendStatus(200);
});

// Get All curricoos
router.get('/curricoos', getAllCurricoos);

// Get curricoo's entries
router.get('/curricoos/:curricooId/entries', getAllCurricooEntries);

// Create a new entry
router.post('/curricoos/:curricooId/entries', createEntry);

// Delete an entry
router.delete('/curricoos/:curricooId/entries/:entryId', function(req, res, next) {
  res.sendStatus(200);
});

// Edit an entry
router.post('/curricoos/:curricooId/entries/:entryId', function(req, res, next) {
  res.sendStatus(200);
});

module.exports = router;
