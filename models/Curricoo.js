const Sequelize = require('sequelize');

exports.CurricooModel = (sequelize) => sequelize.define('curricoo', {
  id: { 
    type: Sequelize.STRING,  
    primaryKey: true,
    validate: { isUUID: 4 }
  },
  ownerId: { 
    type: Sequelize.STRING, 
    validate: { notNull: true } 
  },
  title: { 
    type: Sequelize.STRING, 
    validate: { notNull: true } 
  },
  description: Sequelize.TEXT
}, {
  timestamps: true,
  deletedAt: false
});