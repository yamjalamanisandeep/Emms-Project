const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EcilData = sequelize.define('users', {
  user_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  dofcreation: {
    type: DataTypes.DATE,
  },
  valid: {
    type: DataTypes.INTEGER,
  },
  emp_codeno: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = EcilData;
