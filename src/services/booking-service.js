const bookingRepo = require('../repositories/booking-repo');
const slotRepo = require('../repositories/slot-repo');
const { generateBookingNumber } = require('../helpers/booking-number');
const { AppError } = require('../helpers/errors');

exports.getAll = async ({ page = 1, limit = 10, status, user_id, location_id, date, search }) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (status) where.booking_status = status;
  if (user_id) where.user_id = user_id;
  if (location_id) where.location_id = location_id;
  if (date) where.date = date;

  const { rows, count } = await bookingRepo.findAndCountAll({
    where, limit, offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    data: rows,
    pagination: {
      page: Number(page), limit: Number(limit),
      total: count, totalPages: Math.ceil(count / limit),
    },
  };
};

exports.getById = async (id) => {
  const booking = await bookingRepo.findById(id);
  if (!booking) throw new AppError('Booking not found', 404);
  return booking;
};

exports.getByUser = async (userId, { page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const { rows, count } = await bookingRepo.findAndCountAll({
    where: { user_id: userId },
    limit, offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    data: rows,
    pagination: {
      page: Number(page), limit: Number(limit),
      total: count, totalPages: Math.ceil(count / limit),
    },
  };
};

exports.create = async (userId, data) => {
  const slot = await slotRepo.findById(data.slot_id);
  if (!slot || slot.status === 'maintenance') {
    throw new AppError('Slot is not available', 400);
  }
  if (slot.location_id !== data.location_id) {
    throw new AppError('Slot does not belong to this location', 400);
  }

  const overlapping = await bookingRepo.findOverlapping(
    data.slot_id, data.date, data.start_time, data.end_time
  );
  if (overlapping.length > 0) {
    throw new AppError('Slot already booked for this time period', 409);
  }

  const start = data.start_time.split(':').map(Number);
  const end = data.end_time.split(':').map(Number);
  const hours = ((end[0] * 60 + end[1]) - (start[0] * 60 + start[1])) / 60;
  if (hours <= 0) throw new AppError('End time must be after start time', 400);

  const amount = hours * parseFloat(slot.price_per_hour);
  const tax = amount * 0.18;
  const total = amount + tax;

  const booking = await bookingRepo.create({
    booking_number: await generateBookingNumber(),
    user_id: userId,
    location_id: data.location_id,
    slot_id: data.slot_id,
    vehicle_number: data.vehicle_number,
    vehicle_type: data.vehicle_type,
    date: data.date,
    start_time: data.start_time,
    end_time: data.end_time,
    hours,
    amount,
    tax,
    total_amount: total,
    payment_status: 'pending',
    booking_status: 'pending',
  });

  await slotRepo.update(data.slot_id, { status: 'reserved' });
  return booking;
};

exports.confirm = async (id) => {
  const booking = await bookingRepo.findById(id);
  if (!booking) throw new AppError('Booking not found', 404);
  if (booking.booking_status !== 'pending') {
    throw new AppError('Only pending bookings can be confirmed', 400);
  }
  await bookingRepo.update(id, { booking_status: 'confirmed' });
  return this.getById(id);
};

exports.cancel = async (id) => {
  const booking = await bookingRepo.findById(id);
  if (!booking) throw new AppError('Booking not found', 404);
  if (['completed', 'cancelled', 'refunded'].includes(booking.booking_status)) {
    throw new AppError('Booking cannot be cancelled', 400);
  }

  await bookingRepo.update(id, { booking_status: 'cancelled' });
  await slotRepo.update(booking.slot_id, { status: 'available' });
  return this.getById(id);
};

exports.checkin = async (id) => {
  const booking = await bookingRepo.findById(id);
  if (!booking) throw new AppError('Booking not found', 404);
  if (booking.booking_status !== 'confirmed') {
    throw new AppError('Only confirmed bookings can be checked in', 400);
  }
  await bookingRepo.update(id, { booking_status: 'checked_in' });
  await slotRepo.update(booking.slot_id, { status: 'occupied' });
  return this.getById(id);
};

exports.checkout = async (id) => {
  const booking = await bookingRepo.findById(id);
  if (!booking) throw new AppError('Booking not found', 404);
  if (booking.booking_status !== 'checked_in') {
    throw new AppError('Only checked-in bookings can be checked out', 400);
  }
  await bookingRepo.update(id, { booking_status: 'checked_out' });
  await slotRepo.update(booking.slot_id, { status: 'available' });
  return this.getById(id);
};
