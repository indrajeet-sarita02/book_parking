const bcrypt = require('bcryptjs');
const userRepo = require('../repositories/user-repo');
const { signToken } = require('../config/auth');
const { AppError } = require('../helpers/errors');

exports.register = async ({ name, email, mobile, password }) => {
  const existing = await userRepo.findByEmail(email);
  if (existing) {
    throw new AppError('Email already registered', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepo.create({
    name, email, mobile, password: hashedPassword,
  });

  const token = signToken({
    id: user.id, email: user.email, role: user.role, name: user.name,
  });

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile, role: user.role },
  };
};

exports.login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user || user.status === 'inactive') {
    throw new AppError('Invalid email or password', 401);
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = signToken({
    id: user.id, email: user.email, role: user.role, name: user.name,
  });

  return {
    token,
    user: {
      id: user.id, name: user.name, email: user.email,
      mobile: user.mobile, role: user.role, avatar: user.avatar,
    },
  };
};

exports.getMe = async (userId) => {
  const user = await userRepo.findById(userId);
  if (!user) throw new AppError('User not found', 404);
  return {
    id: user.id, name: user.name, email: user.email,
    mobile: user.mobile, role: user.role, status: user.status,
    avatar: user.avatar, createdAt: user.createdAt,
  };
};
