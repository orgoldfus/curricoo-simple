const { Curricoo } = require('../../models');

async function getAllCurricoos (req, res) {
  const curricoos = await Curricoo.findAll();

  return res.status(200).json(curricoos);
}

module.exports = getAllCurricoos;