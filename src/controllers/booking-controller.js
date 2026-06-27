const bookingService = require('../services/booking-service');
const { success, paginated } = require('../helpers/response');

exports.list = async (req) => {
  const { page, limit, status, location_id, date, search } = Object.fromEntries(
    new URL(req.url).searchParams.entries()
  );
  const result = await bookingService.getAll({
    page, limit, status, location_id, date, search,
  });
  return paginated(result.data, result.pagination);
};

exports.getById = async (req) => {
  const booking = await bookingService.getById(req.params.id);
  return success(booking);
};

exports.myBookings = async (req) => {
  const { page, limit } = Object.fromEntries(new URL(req.url).searchParams.entries());
  const result = await bookingService.getByUser(req.user.id, { page, limit });
  return paginated(result.data, result.pagination);
};

exports.create = async (req) => {
  const booking = await bookingService.create(req.user.id, req.validatedBody);
  return success(booking, 'Booking created successfully');
};

exports.confirm = async (req) => {
  const booking = await bookingService.confirm(req.params.id);
  return success(booking, 'Booking confirmed successfully');
};

exports.cancel = async (req) => {
  const booking = await bookingService.cancel(req.params.id);
  return success(booking, 'Booking cancelled successfully');
};

exports.checkin = async (req) => {
  const booking = await bookingService.checkin(req.params.id);
  return success(booking, 'Check-in successful');
};

exports.checkout = async (req) => {
  const booking = await bookingService.checkout(req.params.id);
  return success(booking, 'Check-out successful');
};
