const { Entry } = require('../../models');

async function createEntry (req, res) {
  const entry = await Entry.create(req.body);

  return res.status(201).json(entry);
}

async function getAllCurricooEntries (req, res) {
  const entries = await Entry.findAll({ 
    where: { curricooId: req.params.curricooId } 
  });

  return res.status(200).json(entries);
}

async function deleteEntry (req, res) {
  await Entry.destroy({ 
    where: { 
      id: req.params.entryId,
      curricooId: req.params.curricooId
    } 
  });

  return res.status(200).send('Entry deleted successfully');
}

module.exports = {
  createEntry,
  getAllCurricooEntries
}