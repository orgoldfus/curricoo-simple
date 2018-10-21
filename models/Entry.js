const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const CurricooModel = require('./Curricoo')
const validTypes = ['Video', 'Blog', 'Article', 'Code Repo', 'Book', 'Podcast']

module.exports = (sequelize) => {
  const Entry = sequelize.define('entry', {
    id: { 
      type: Sequelize.UUID,
      primaryKey: true
    },
    index: Sequelize.INTEGER,
    title: { 
      type: Sequelize.STRING, 
      allowNull: false
    },
    notes: Sequelize.TEXT,
    url: { 
      type: Sequelize.STRING,
      allowNull: false,
      validate: { isUrl: true }
    },
    type: { 
      type: Sequelize.ENUM,
      values: validTypes,
      allowNull: false
    }
  }, {
    timestamps: true,
    deletedAt: false
  })

  const Curricoo = CurricooModel(sequelize)
  Entry.belongsTo(Curricoo)

  Entry.beforeCreate(entry => {
    return entry.id = uuid()
  })

  return Entry
}