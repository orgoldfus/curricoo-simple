const { Entry } = require('../../models');

async function getAllCurricooEntries (req, res) {
  const entries = await Entry.findAll({ 
    where: { curricooId: req.params.curricooId } 
  });

  return res.status(200).json(entries);
}

module.exports = getAllCurricooEntries;