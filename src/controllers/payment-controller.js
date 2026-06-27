const paymentService = require('../services/payment-service');
const { success } = require('../helpers/response');

exports.create = async (req) => {
  const payment = await paymentService.create(req.body);
  return success(payment, 'Payment successful');
};

exports.list = async (req) => {
  const { page, limit } = Object.fromEntries(new URL(req.url).searchParams.entries());
  const result = await paymentService.getAll({ page, limit });
  return success(result.data);
};

exports.getById = async (req) => {
  const payment = await paymentService.getById(req.params.id);
  return success(payment);
};
