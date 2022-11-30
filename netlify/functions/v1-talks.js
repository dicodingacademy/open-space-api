const getTalksHandler = require('../libs/handlers/v1/getTalksHandler');
const postTalksHandler = require('../libs/handlers/v1/postTalksHandler');
const {
  commonHandler,
  withAuth,
} = require('../libs/utils/functions');

exports.handler = commonHandler((request, context) => {
  if (request.httpMethod === 'GET') {
    return getTalksHandler();
  }

  if (request.httpMethod === 'POST') {
    return withAuth((authedRequest) => postTalksHandler(authedRequest))(request, context);
  }

  return {
    statusCode: 405,
  };
});
