const HttpError = require("./errors/HttpError");

function errorHandler(err, req, req, res, next) {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (process.env.NODE_ENV === "development") {
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
      return;
    }
  }
  console.log(error);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
}

module.exports = errorHandler;
