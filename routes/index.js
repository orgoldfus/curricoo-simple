const express = require('express')
const router = express.Router()
const {
  createCurricoo,
  getAllCurricoos,
  deleteCurricoo
} = require('./curricoo')
const {
  createEntry,
  deleteEntry,
  getAllCurricooEntries
} = require('./entry')

// Get curricoo with entries
router.get('/:curricooId', function(req, res) {
  res.sendStatus(200)
})

router.post('/', createCurricoo)

router.delete('/:curricooId', deleteCurricoo)

// Edit a curricoo
router.post('/:curricooId', function(req, res) {
  res.sendStatus(200)
})

router.get('/', getAllCurricoos)

router.get('/:curricooId/entries', getAllCurricooEntries)

router.post('/:curricooId/entries', createEntry)

router.delete('/:curricooId/entries/:entryId', deleteEntry)

// Edit an entry
router.post('/:curricooId/entries/:entryId', function(req, res) {
  res.sendStatus(200)
})

module.exports = router
