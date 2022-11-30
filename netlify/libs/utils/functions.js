const createTokenize = require('../tokenize/jwt');
const ClientError = require('../exceptions/ClientError');

function response({ statusCode = 200, message = 'ok', data = {} }) {
  const statuses = {
    2: 'success',
    4: 'fail',
    5: 'error',
  };

  const status = statuses[String(statusCode)[0]];

  return {
    statusCode,
    body: JSON.stringify({
      status,
      message,
      data,
    }),
  };
}

function withErrorHandler(next) {
  return async (event, context) => {
    try {
      const result = await next(event, context);

      // to keep await
      return { ...result };
    } catch (error) {
      if (error instanceof ClientError) {
        return response({
          statusCode: error.statusCode,
          message: error.message,
        });
      }

      return response({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  };
}

function withCors(next) {
  return async (event, context) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Max-Age': '2592000',
      'Access-Control-Allow-Credentials': 'true',
    };

    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
      };
    }

    const originalResponse = await next(event, context);

    return {
      ...originalResponse,
      headers: {
        ...originalResponse.headers,
        ...headers,
        'x-powered-by': 'Dicoding Teams',
      },
    };
  };
}

function withAuth(next) {
  return async (event, context) => {
    const { authorization } = event.headers;

    if (!authorization) {
      return response({
        statusCode: 401,
        message: 'Unauthorized',
      });
    }

    const [, token] = authorization.split(' ');
    const tokenize = createTokenize();

    try {
      const decoded = await tokenize.verifyAccessToken(token);

      return next(event, context, decoded);
    } catch (error) {
      return response({
        statusCode: 401,
        message: 'token invalid',
      });
    }
  };
}
module.exports = {
  withCors, withAuth, withErrorHandler, response,
};
