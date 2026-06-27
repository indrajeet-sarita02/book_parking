const reportService = require('../services/report-service');
const { success } = require('../helpers/response');

exports.dashboard = async (req) => {
  const stats = await reportService.getDashboardStats();
  return success(stats);
};

exports.revenue = async (req) => {
  const { startDate, endDate } = Object.fromEntries(new URL(req.url).searchParams.entries());
  const report = await reportService.getRevenueReport({ startDate, endDate });
  return success(report);
};

exports.bookings = async (req) => {
  const { startDate, endDate } = Object.fromEntries(new URL(req.url).searchParams.entries());
  const report = await reportService.getBookingReport({ startDate, endDate });
  return success(report);
};
