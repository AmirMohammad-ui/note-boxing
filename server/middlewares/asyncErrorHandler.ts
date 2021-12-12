export default (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.log(err.message);
      }
      next(err);
    }
  };
};

