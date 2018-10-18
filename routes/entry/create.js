const { Entry } = require('../../models');

async function createEntry (req, res) {
  const entry = await Entry.create(req.body);

  return res.status(201).json(entry);
}

module.exports = createEntry;