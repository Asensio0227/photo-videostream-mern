const { StatusCodes } = require('http-status-codes');
const CustomError = require('./custom');

class UnAuthenticatedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode=StatusCodes.UNAUTHORIZED
  };
};

module.exports=UnAuthenticatedError;