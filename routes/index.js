var express = require('express');
var router = express.Router();

// Get curricoo with entries
router.get('curricoos/:curricooId', function(req, res, next) {
  res.sendStatus(200);
});

// Create a new curricoo
router.post('curricoos/', function(req, res, next) {
  res.sendStatus(200);
});

// Delete a curricoo
router.delete('curricoos/:curricooId', function(req, res, next) {
  res.sendStatus(200);
});

// Edit a curricoo
router.post('curricoos/:curricooId', function(req, res, next) {
  res.sendStatus(200);
});

// Get All curricoos
router.get('curricoos/', function(req, res, next) {
  res.sendStatus(200);
});

// Get curricoo's entries
router.get('curricoos/:curricooId/entries', function(req, res, next) {
  res.sendStatus(200);
});

// Create a new entry
router.post('curricoos/:curricooId/entries', function(req, res, next) {
  res.sendStatus(200);
});

// Delete an entry
router.delete('curricoos/:curricooId/entries/:entryId', function(req, res, next) {
  res.sendStatus(200);
});

// Edit an entry
router.post('curricoos/:curricooId/entries/:entryId', function(req, res, next) {
  res.sendStatus(200);
});

module.exports = router;
