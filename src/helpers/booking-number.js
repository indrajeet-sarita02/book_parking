const { BOOKING_NUMBER_PREFIX } = require('../lib/constants');
const { sequelize } = require('../database');

async function generateBookingNumber() {
  const date = new Date();
  const yy = date.getFullYear().toString().slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const dateStr = `${yy}${mm}${dd}`;

  const query = `SELECT COUNT(*) as count FROM bookings WHERE date(created_at) = date('now')`;
  const [result] = await sequelize.query(query);
  const seq = String(Number(result[0]?.count || 0) + 1).padStart(4, '0');

  return `${BOOKING_NUMBER_PREFIX}${dateStr}${seq}`;
}

module.exports = { generateBookingNumber };
