const authController = require('./auth-controller');
const userController = require('./user-controller');
const locationController = require('./location-controller');
const slotController = require('./slot-controller');
const bookingController = require('./booking-controller');
const paymentController = require('./payment-controller');
const reportController = require('./report-controller');

module.exports = {
  authController,
  userController,
  locationController,
  slotController,
  bookingController,
  paymentController,
  reportController,
};
