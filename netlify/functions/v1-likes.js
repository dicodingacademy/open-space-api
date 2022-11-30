const postTalksLikesHandler = require('../libs/handlers/v1/postTalksLikesHandler');
const {
  withCors, withAuth,
  withErrorHandler,
} = require('../libs/utils/functions');

exports.handler = withCors(
  withErrorHandler(
    withAuth((request, _, decoded) => {
      if (request.httpMethod === 'POST') {
        return postTalksLikesHandler(request, decoded);
      }

      return {
        statusCode: 405,
      };
    }),
  ),
);
