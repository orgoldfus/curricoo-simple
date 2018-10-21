const Sequelize = require('sequelize')
const CurricooModel = require('./Curricoo')
const EntryModel = require('./Entry')

// TODO: Use env variables
const sequelize = new Sequelize('curricoo', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
})

const Curricoo = CurricooModel(sequelize)
const Entry = EntryModel(sequelize)

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!')
  })

module.exports = {
  Curricoo,
  Entry
}