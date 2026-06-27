const paymentRepo = require('../repositories/payment-repo');
const bookingRepo = require('../repositories/booking-repo');
const { AppError } = require('../helpers/errors');

exports.create = async (data) => {
  const booking = await bookingRepo.findById(data.booking_id);
  if (!booking) throw new AppError('Booking not found', 404);

  const payment = await paymentRepo.create({
    booking_id: data.booking_id,
    transaction_id: data.transaction_id,
    amount: data.amount || booking.total_amount,
    payment_method: data.payment_method || 'razorpay',
    status: 'success',
    payment_data: data.payment_data ? JSON.stringify(data.payment_data) : null,
  });

  await bookingRepo.update(data.booking_id, {
    payment_status: 'paid',
    booking_status: 'confirmed',
  });

  return payment;
};

exports.getAll = async ({ page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const { rows, count } = await paymentRepo.findAndCountAll({
    limit,
    offset,
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
  const payment = await paymentRepo.findById(id);
  if (!payment) throw new AppError('Payment not found', 404);
  return payment;
};
