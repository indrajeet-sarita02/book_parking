const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ParkingSlot = sequelize.define('ParkingSlot', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  slot_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  floor: {
    type: DataTypes.STRING(20),
  },
  vehicle_type: {
    type: DataTypes.ENUM('car', 'bike', 'auto', 'bus', 'truck', 'ev'),
    defaultValue: 'car',
  },
  status: {
    type: DataTypes.ENUM('available', 'occupied', 'reserved', 'maintenance'),
    defaultValue: 'available',
  },
  price_per_hour: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
  },
}, {
  timestamps: true,
  underscored: true,
  tableName: 'parking_slots',
});

module.exports = ParkingSlot;
