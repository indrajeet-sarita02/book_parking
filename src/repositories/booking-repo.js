const { Booking, User, Location, ParkingSlot } = require('../database');

exports.findAndCountAll = (options) => Booking.findAndCountAll({
  include: [
    { model: User, attributes: ['id', 'name', 'email', 'mobile'] },
    { model: Location, attributes: ['id', 'name', 'city', 'state'] },
    { model: ParkingSlot, attributes: ['id', 'slot_number', 'floor'] },
  ],
  ...options,
});

exports.findAll = (options) => Booking.findAll({
  include: [
    { model: User, attributes: ['id', 'name', 'email', 'mobile'] },
    { model: Location, attributes: ['id', 'name', 'city', 'state'] },
    { model: ParkingSlot, attributes: ['id', 'slot_number', 'floor'] },
  ],
  ...options,
});

exports.findById = (id) => Booking.findByPk(id, {
  include: [
    { model: User, attributes: ['id', 'name', 'email', 'mobile'] },
    { model: Location, attributes: ['id', 'name', 'address', 'city', 'state'] },
    { model: ParkingSlot, attributes: ['id', 'slot_number', 'floor', 'price_per_hour'] },
  ],
});

exports.findOverlapping = (slotId, date, startTime, endTime) => Booking.findAll({
  where: {
    slot_id: slotId,
    date,
    booking_status: ['pending', 'confirmed', 'checked_in'],
  },
});

exports.create = (data) => Booking.create(data);
exports.update = (id, data) => Booking.update(data, { where: { id } });
exports.delete = (id) => Booking.destroy({ where: { id } });
