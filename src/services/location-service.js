const locationRepo = require('../repositories/location-repo');
const { AppError } = require('../helpers/errors');

exports.getAll = async ({ page = 1, limit = 10, city, state, status, search }) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (city) where.city = city;
  if (state) where.state = state;
  if (status) where.status = status;
  if (search) {
    where[require('sequelize').Op.or] = [
      { name: { [require('sequelize').Op.like]: `%${search}%` } },
      { address: { [require('sequelize').Op.like]: `%${search}%` } },
      { city: { [require('sequelize').Op.like]: `%${search}%` } },
    ];
  }

  const { rows, count } = await locationRepo.findAndCountAll({
    where, limit, offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    data: rows,
    pagination: {
      page: Number(page), limit: Number(limit),
      total: count, totalPages: Math.ceil(count / limit),
    },
  };
};

exports.getById = async (id) => {
  const location = await locationRepo.findById(id);
  if (!location) throw new AppError('Location not found', 404);
  const slots = await require('../repositories/slot-repo').findByLocation(id);
  return { ...location.toJSON(), slots };
};

exports.create = async (data) => {
  return locationRepo.create(data);
};

exports.update = async (id, data) => {
  const location = await locationRepo.findById(id);
  if (!location) throw new AppError('Location not found', 404);
  await locationRepo.update(id, data);
  return this.getById(id);
};

exports.delete = async (id) => {
  const location = await locationRepo.findById(id);
  if (!location) throw new AppError('Location not found', 404);
  await locationRepo.delete(id);
};
