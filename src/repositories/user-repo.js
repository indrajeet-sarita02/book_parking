const { User } = require('../database');

exports.findAndCountAll = (options) => User.findAndCountAll(options);
exports.findById = (id) => User.findByPk(id);
exports.findOne = (where) => User.findOne({ where });
exports.findByEmail = (email) => User.findOne({ where: { email } });
exports.create = (data) => User.create(data);
exports.update = (id, data) => User.update(data, { where: { id } });
exports.delete = (id) => User.destroy({ where: { id } });
