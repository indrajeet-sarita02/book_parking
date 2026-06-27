const slotService = require('../services/slot-service');
const { success, paginated } = require('../helpers/response');

exports.list = async (req) => {
  const { page, limit, location_id, vehicle_type, status } = Object.fromEntries(
    new URL(req.url).searchParams.entries()
  );
  const result = await slotService.getAll({ page, limit, location_id, vehicle_type, status });
  return paginated(result.data, result.pagination);
};

exports.getByLocation = async (req) => {
  const { vehicle_type } = Object.fromEntries(new URL(req.url).searchParams.entries());
  const slots = await slotService.getByLocation(req.params.id, vehicle_type);
  return success(slots);
};

exports.getById = async (req) => {
  const slot = await slotService.getById(req.params.id);
  return success(slot);
};

exports.create = async (req) => {
  const slot = await slotService.create(req.validatedBody);
  return success(slot, 'Slot created successfully');
};

exports.update = async (req) => {
  const slot = await slotService.update(req.params.id, req.validatedBody);
  return success(slot, 'Slot updated successfully');
};

exports.delete = async (req) => {
  await slotService.delete(req.params.id);
  return success(null, 'Slot deleted successfully');
};
