function asyncErrorHandler(fn) {
  return async (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

module.exports = asyncErrorHandler;
