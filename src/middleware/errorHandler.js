const errorHandler = (err, req, res, next) => {
  console.error('[Error Logger]:', err.stack || err);
  
  const status = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred on the server';

  res.status(status).json({
    success: false,
    message
  });
};

module.exports = errorHandler;
