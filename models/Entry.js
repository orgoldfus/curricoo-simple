const Sequelize = require('sequelize');
const validTypes = ['video', 'blog', 'article', 'codeRepo', 'book', 'podcast'];

exports.EntryModel = (sequelize) => sequelize.define('entry', {
  id: { 
    type: Sequelize.STRING,
    primaryKey: true,
    validate: { isUUID: 4 }
  },
  curricooId: { 
    type: Sequelize.STRING, 
    validate: { notNull: true, isUUID: 4 } 
  },
  title: { 
    type: Sequelize.STRING, 
    validate: { notNull: true } 
  },
  notes: Sequelize.TEXT,
  url: { 
    type: Sequelize.STRING, 
    validate: { notNull: true, isUrl: true } 
  },
  type: { 
    type:   Sequelize.ENUM,
    values: validTypes,
    validate: { notNull: true } 
  }
}, {
  timestamps: true,
  deletedAt: false
});