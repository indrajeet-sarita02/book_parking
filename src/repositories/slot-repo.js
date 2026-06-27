const { ParkingSlot } = require('../database');

exports.findAndCountAll = (options) => ParkingSlot.findAndCountAll(options);
exports.findAll = (options) => ParkingSlot.findAll(options);
exports.findById = (id) => ParkingSlot.findByPk(id);
exports.findByLocation = (locationId) => ParkingSlot.findAll({ where: { location_id: locationId } });
exports.create = (data) => ParkingSlot.create(data);
exports.bulkCreate = (data) => ParkingSlot.bulkCreate(data);
exports.update = (id, data) => ParkingSlot.update(data, { where: { id } });
exports.delete = (id) => ParkingSlot.destroy({ where: { id } });
