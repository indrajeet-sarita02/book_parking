const authService = require('../services/auth-service');
const { success, error } = require('../helpers/response');

exports.register = async (req) => {
  const result = await authService.register(req.validatedBody);
  return { ...success(result.user, 'Registration successful'), token: result.token };
};

exports.login = async (req) => {
  const result = await authService.login(req.validatedBody);
  return { ...success(result.user, 'Login successful'), token: result.token };
};

exports.me = async (req) => {
  const user = await authService.getMe(req.user.id);
  return success(user);
};
