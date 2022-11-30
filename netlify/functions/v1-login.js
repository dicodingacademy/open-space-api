const postLoginHandler = require('../libs/handlers/v1/postLoginHandler');
const {
  withCors,
  withErrorHandler,
} = require('../libs/utils/functions');

exports.handler = withCors(
  withErrorHandler((request) => {
    if (request.httpMethod === 'POST') {
      return postLoginHandler(request);
    }

    return {
      statusCode: 405,
    };
  }),
);
