const createTokenize = require('../tokenize/jwt');

function response({ statusCode = 200, message = 'ok', data = {} }) {
  let status = 'unknown';

  if (String(statusCode).startsWith('2')) {
    status = 'success';
  } else if (String(statusCode).startsWith('4')) {
    status = 'fail';
  } else if (String(statusCode).startsWith('5')) {
    status = 'error';
  }

  return {
    statusCode,
    body: JSON.stringify({
      status,
      message,
      data,
    }),
  };
}

function withCors(next) {
  return async (request, context) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Max-Age': '2592000',
      'Access-Control-Allow-Credentials': 'true',
    };

    if (request.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
      };
    }

    const originalResponse = await next(request, context);

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
  return async (request, context) => {
    const { authorization } = request.headers;

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

      return next(request, context, decoded);
    } catch (error) {
      return response({
        statusCode: 401,
        message: 'token invalid',
      });
    }
  };
}
module.exports = { withCors, withAuth, response };
