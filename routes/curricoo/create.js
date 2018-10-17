const { Curricoo } = require('../../models');

async function createCurricoo (req, res) {
  const curricoo = await Curricoo.create(req.body);

  return res.status(201).json(curricoo);
}

module.exports = createCurricoo;