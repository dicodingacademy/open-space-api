const ClientError = require('./ClientError');

class NotFoundError extends ClientError {
  constructor(message = 'resource not found') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
