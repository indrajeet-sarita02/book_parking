const sequelize = require('../config/database');
const User = require('../models/User');
const Location = require('../models/Location');
const ParkingSlot = require('../models/ParkingSlot');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');

User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

Location.hasMany(ParkingSlot, { foreignKey: 'location_id' });
ParkingSlot.belongsTo(Location, { foreignKey: 'location_id' });

Location.hasMany(Booking, { foreignKey: 'location_id' });
Booking.belongsTo(Location, { foreignKey: 'location_id' });

ParkingSlot.hasMany(Booking, { foreignKey: 'slot_id' });
Booking.belongsTo(ParkingSlot, { foreignKey: 'slot_id' });

Booking.hasOne(Payment, { foreignKey: 'booking_id' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id' });

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    if (!process.env.VERCEL || process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
      console.log('Database synced successfully');
    }
  } catch (err) {
    console.error('Database sync failed:', err);
  }
}

module.exports = { sequelize, initDatabase, User, Location, ParkingSlot, Booking, Payment };
