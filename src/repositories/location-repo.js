const { Location } = require('../database');

exports.findAndCountAll = (options) => Location.findAndCountAll(options);
exports.findAll = (options) => Location.findAll(options);
exports.findById = (id) => Location.findByPk(id);
exports.create = (data) => Location.create(data);
exports.update = (id, data) => Location.update(data, { where: { id } });
exports.delete = (id) => Location.destroy({ where: { id } });
