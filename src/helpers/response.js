exports.success = (data, message = 'Success') => ({
  success: true,
  data,
  message,
});

exports.paginated = (data, pagination, message = 'Success') => ({
  success: true,
  data,
  pagination,
  message,
});

exports.error = (message, statusCode = 500, errors = []) => ({
  success: false,
  message,
  errors,
  statusCode,
});
