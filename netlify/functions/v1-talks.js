const getTalksHandler = require('../libs/handlers/v1/getTalksHandler');
const postTalksHandler = require('../libs/handlers/v1/postTalksHandler');
const {
  commonHandler,
  withAuth,
} = require('../libs/utils/functions');

exports.handler = commonHandler((event, context) => {
  if (event.httpMethod === 'GET') {
    return getTalksHandler();
  }

  if (event.httpMethod === 'POST') {
    return withAuth((authedEvent) => postTalksHandler(authedEvent))(event, context);
  }

  return {
    statusCode: 405,
  };
});
