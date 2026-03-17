const sendResponse = (res, statusCode, success, message, data = null) => {
  res.status(statusCode).json({
    success,
    message,
    ...(data && { data }),
  });
};

const handleError = (res, statusCode, message) => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  sendResponse,
  handleError,
};
