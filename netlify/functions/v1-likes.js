const postTalksLikesHandler = require('../libs/handlers/v1/postTalksLikesHandler');
const {
  commonWithAuthHandler,
} = require('../libs/utils/functions');

exports.handler = commonWithAuthHandler((request) => {
  if (request.httpMethod === 'POST') {
    return postTalksLikesHandler(request);
  }

  return {
    statusCode: 405,
  };
});
