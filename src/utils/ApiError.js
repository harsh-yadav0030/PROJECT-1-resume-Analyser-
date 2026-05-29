class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something Went Wrong",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.data=null

    if (stack) {
      this.stack = stack;
    }
    else if (Error.captureStackTrace){
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export {ApiError};
