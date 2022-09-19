const postTalksLikesHandler = require('../libs/handlers/v1/postTalksLikesHandler');
const { withCors, withAuth } = require('../libs/utils/functions');

exports.handler = withCors(withAuth((request, _, decoded) => {
  if (request.httpMethod === 'POST') {
    return postTalksLikesHandler(request, decoded);
  }

  return {
    statusCode: 405,
  };
}));
