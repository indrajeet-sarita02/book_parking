const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  booking_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  slot_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vehicle_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  vehicle_type: {
    type: DataTypes.ENUM('car', 'bike', 'auto', 'bus', 'truck', 'ev'),
    defaultValue: 'car',
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hours: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
    defaultValue: 'pending',
  },
  booking_status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'completed', 'cancelled', 'refunded'),
    defaultValue: 'pending',
  },
  qr_code: {
    type: DataTypes.TEXT,
  },
  notes: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
  underscored: true,
  tableName: 'bookings',
});

module.exports = Booking;
