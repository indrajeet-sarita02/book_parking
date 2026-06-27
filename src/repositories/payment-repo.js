const { Payment } = require('../database');

exports.findAndCountAll = (options) => Payment.findAndCountAll(options);
exports.findAll = (options) => Payment.findAll(options);
exports.findById = (id) => Payment.findByPk(id);
exports.findByBooking = (bookingId) => Payment.findOne({ where: { booking_id: bookingId } });
exports.findByTransaction = (transactionId) => Payment.findOne({ where: { transaction_id: transactionId } });
exports.create = (data) => Payment.create(data);
exports.update = (id, data) => Payment.update(data, { where: { id } });
