const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Location = sequelize.define('Location', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT(10, 7),
  },
  longitude: {
    type: DataTypes.FLOAT(10, 7),
  },
  opening_time: {
    type: DataTypes.TIME,
    defaultValue: '00:00:00',
  },
  closing_time: {
    type: DataTypes.TIME,
    defaultValue: '23:59:00',
  },
  total_slots: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  images: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
}, {
  timestamps: true,
  underscored: true,
  tableName: 'locations',
});

module.exports = Location;
