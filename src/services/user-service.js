const bcrypt = require('bcryptjs');
const userRepo = require('../repositories/user-repo');
const { AppError } = require('../helpers/errors');

exports.getAll = async ({ page = 1, limit = 10, search, role, status }) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (role) where.role = role;
  if (status) where.status = status;
  if (search) {
    where[require('sequelize').Op.or] = [
      { name: { [require('sequelize').Op.like]: `%${search}%` } },
      { email: { [require('sequelize').Op.like]: `%${search}%` } },
      { mobile: { [require('sequelize').Op.like]: `%${search}%` } },
    ];
  }

  const { rows, count } = await userRepo.findAndCountAll({
    where, limit, offset,
    attributes: { exclude: ['password'] },
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
  const user = await userRepo.findById(id);
  if (!user) throw new AppError('User not found', 404);
  const { password, ...userData } = user.toJSON();
  return userData;
};

exports.create = async (data) => {
  const existing = await userRepo.findByEmail(data.email);
  if (existing) throw new AppError('Email already exists', 409);

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await userRepo.create({ ...data, password: hashedPassword });
  const { password, ...userData } = user.toJSON();
  return userData;
};

exports.update = async (id, data) => {
  const user = await userRepo.findById(id);
  if (!user) throw new AppError('User not found', 404);

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  await userRepo.update(id, data);
  return this.getById(id);
};

exports.delete = async (id) => {
  const user = await userRepo.findById(id);
  if (!user) throw new AppError('User not found', 404);
  await userRepo.delete(id);
};
