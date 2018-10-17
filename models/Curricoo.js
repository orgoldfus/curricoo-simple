const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

module.exports = (sequelize) => {
  const Curricoo = sequelize.define('curricoo', {
  id: { 
    type: Sequelize.UUID,
    primaryKey: true
  },
  ownerId: { 
    type: Sequelize.UUID, 
    // allowNull: false
  },
  title: { 
    type: Sequelize.STRING, 
    allowNull: false
  },
  description: Sequelize.TEXT
  }, {
    timestamps: true,
    deletedAt: false
  });

  Curricoo.beforeCreate(curricoo => {
    return curricoo.id = uuid();
  });

  return Curricoo;
}