const userService = require('../services/user-service');
const { success, paginated } = require('../helpers/response');

exports.list = async (req) => {
  const { page, limit, search, role, status } = Object.fromEntries(
    new URL(req.url).searchParams.entries()
  );
  const result = await userService.getAll({ page, limit, search, role, status });
  return paginated(result.data, result.pagination);
};

exports.getById = async (req) => {
  const user = await userService.getById(req.params.id);
  return success(user);
};

exports.create = async (req) => {
  const user = await userService.create(req.validatedBody);
  return success(user, 'User created successfully');
};

exports.update = async (req) => {
  const user = await userService.update(req.params.id, req.validatedBody);
  return success(user, 'User updated successfully');
};

exports.delete = async (req) => {
  await userService.delete(req.params.id);
  return success(null, 'User deleted successfully');
};
