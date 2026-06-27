const locationService = require('../services/location-service');
const { success, paginated } = require('../helpers/response');

exports.list = async (req) => {
  const { page, limit, city, state, status, search } = Object.fromEntries(
    new URL(req.url).searchParams.entries()
  );
  const result = await locationService.getAll({ page, limit, city, state, status, search });
  return paginated(result.data, result.pagination);
};

exports.getById = async (req) => {
  const location = await locationService.getById(req.params.id);
  return success(location);
};

exports.create = async (req) => {
  const location = await locationService.create(req.validatedBody);
  return success(location, 'Location created successfully');
};

exports.update = async (req) => {
  const location = await locationService.update(req.params.id, req.validatedBody);
  return success(location, 'Location updated successfully');
};

exports.delete = async (req) => {
  await locationService.delete(req.params.id);
  return success(null, 'Location deleted successfully');
};
