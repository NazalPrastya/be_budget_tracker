const HttpError = require("./HttpError");

class UnathorizedError extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 401);
    this.name = "UnathorizedError";
  }
}

module.exports = UnathorizedError;
