const slotRepo = require('../repositories/slot-repo');
const locationRepo = require('../repositories/location-repo');
const { AppError } = require('../helpers/errors');

exports.getAll = async ({ page = 1, limit = 50, location_id, vehicle_type, status }) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (location_id) where.location_id = location_id;
  if (vehicle_type) where.vehicle_type = vehicle_type;
  if (status) where.status = status;

  const { rows, count } = await slotRepo.findAndCountAll({
    where, limit, offset,
    include: [{ model: require('../models/Location'), attributes: ['id', 'name', 'city', 'state'] }],
    order: [['slot_number', 'ASC']],
  });

  return {
    data: rows,
    pagination: {
      page: Number(page), limit: Number(limit),
      total: count, totalPages: Math.ceil(count / limit),
    },
  };
};

exports.getByLocation = async (locationId, vehicleType) => {
  const location = await locationRepo.findById(locationId);
  if (!location) throw new AppError('Location not found', 404);

  const where = { location_id: locationId };
  if (vehicleType) where.vehicle_type = vehicleType;

  const slots = await slotRepo.findAll({ where, order: [['slot_number', 'ASC']] });
  return slots;
};

exports.getById = async (id) => {
  const slot = await slotRepo.findById(id);
  if (!slot) throw new AppError('Slot not found', 404);
  return slot;
};

exports.create = async (data) => {
  const location = await locationRepo.findById(data.location_id);
  if (!location) throw new AppError('Location not found', 404);

  const slot = await slotRepo.create(data);

  const count = await slotRepo.findAll({ where: { location_id: data.location_id } });
  await locationRepo.update(data.location_id, { total_slots: count.length });

  return slot;
};

exports.update = async (id, data) => {
  const slot = await slotRepo.findById(id);
  if (!slot) throw new AppError('Slot not found', 404);
  await slotRepo.update(id, data);
  return this.getById(id);
};

exports.delete = async (id) => {
  const slot = await slotRepo.findById(id);
  if (!slot) throw new AppError('Slot not found', 404);
  await slotRepo.delete(id);
};
