const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const CurricooModel = require('./Curricoo');
const validTypes = ['video', 'blog', 'article', 'codeRepo', 'book', 'podcast'];

module.exports = (sequelize) => {
  const Entry = sequelize.define('entry', {
    id: { 
      type: Sequelize.UUID,
      primaryKey: true
    },
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
  });

  const Curricoo = CurricooModel(sequelize);
  Entry.belongsTo(Curricoo);

  Entry.beforeCreate(entry => {
    return entry.id = uuid();
  });

  return Entry;
}