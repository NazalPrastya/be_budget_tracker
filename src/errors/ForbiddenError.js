const HttpError = require("./HttpError");

class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

module.exports = ForbiddenError;
