const { Curricoo } = require('../../models')

async function createCurricoo (req, res) {
  const curricoo = await Curricoo.create(req.body)

  return res.status(201).json(curricoo)
}

async function deleteCurricoo (req, res) {
  await Curricoo.destroy({ 
    where: { id: req.params.curricooId } 
  })

  return res.status(200).send('Curricoo deleted successfully')
}

async function getAllCurricoos (req, res) {
  const curricoos = await Curricoo.findAll()

  return res.status(200).json(curricoos)
}

module.exports = {
  createCurricoo,
  deleteCurricoo,
  getAllCurricoos
}