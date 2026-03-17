const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      req.validated = validated;
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors,
      });
    }
  };
};

module.exports = validateRequest;
