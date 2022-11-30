const postTalksLikesHandler = require('../libs/handlers/v1/postTalksLikesHandler');
const {
  withAuth,
  commonHandler,
} = require('../libs/utils/functions');

exports.handler = commonHandler(
  withAuth((request, _, decoded) => {
    if (request.httpMethod === 'POST') {
      return postTalksLikesHandler(request, decoded);
    }

    return {
      statusCode: 405,
    };
  }),
);
