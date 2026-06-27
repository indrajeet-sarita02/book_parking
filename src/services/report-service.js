const { Booking, Payment, User, Location, ParkingSlot } = require('../database');
const { Op } = require('sequelize');

exports.getDashboardStats = async () => {
  const today = new Date().toISOString().split('T')[0];

  const [
    totalUsers,
    todayBookings,
    pendingBookings,
    confirmedBookings,
    availableSlots,
    occupiedSlots,
    revenueResult,
  ] = await Promise.all([
    User.count({ where: { role: 'customer' } }),
    Booking.count({ where: { date: today } }),
    Booking.count({ where: { booking_status: 'pending' } }),
    Booking.count({ where: { booking_status: 'confirmed' } }),
    ParkingSlot.count({ where: { status: 'available' } }),
    ParkingSlot.count({ where: { status: 'occupied' } }),
    Payment.sum('amount', {
      where: {
        status: 'success',
        createdAt: {
          [Op.gte]: new Date(new Date().setDate(1)),
        },
      },
    }),
  ]);

  const totalSlots = availableSlots + occupiedSlots;

  return {
    totalUsers,
    todayBookings,
    pendingBookings,
    confirmedBookings,
    revenueThisMonth: revenueResult || 0,
    availableSlots,
    occupiedSlots,
    utilization: totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0,
  };
};

exports.getRevenueReport = async ({ startDate, endDate }) => {
  const where = { status: 'success' };
  if (startDate) where.createdAt = { ...where.createdAt, [Op.gte]: new Date(startDate) };
  if (endDate) where.createdAt = { ...where.createdAt, [Op.lte]: new Date(endDate) };

  const payments = await Payment.findAll({ where });
  const totalRevenue = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);

  return { totalRevenue, totalTransactions: payments.length, payments };
};

exports.getBookingReport = async ({ startDate, endDate }) => {
  const where = {};
  if (startDate) where.date = { [Op.gte]: startDate };
  if (endDate) where.date = { ...where.date, [Op.lte]: endDate };

  const bookings = await Booking.findAll({ where });
  const statusCounts = {};
  bookings.forEach(b => {
    statusCounts[b.booking_status] = (statusCounts[b.booking_status] || 0) + 1;
  });

  return {
    total: bookings.length,
    byStatus: statusCounts,
    bookings,
  };
};
