const getTalksHandler = require('../libs/handlers/v1/getTalksHandler');
const postTalksHandler = require('../libs/handlers/v1/postTalksHandler');
const { withCors, withAuth } = require('../libs/utils/functions');

exports.handler = withCors((request, context) => {
  if (request.httpMethod === 'GET') {
    return getTalksHandler();
  }

  if (request.httpMethod === 'POST') {
    return withAuth((
      _,
      __,
      decoded,
    ) => postTalksHandler(request, context, decoded))(request, context);
  }

  return {
    statusCode: 405,
  };
});
