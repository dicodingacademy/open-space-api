const postTalksLikesHandler = require('../libs/handlers/v1/postTalksLikesHandler');
const {
  commonWithAuthHandler,
} = require('../libs/utils/functions');

exports.handler = commonWithAuthHandler((event) => {
  if (event.httpMethod === 'POST') {
    return postTalksLikesHandler(event);
  }

  return {
    statusCode: 405,
  };
});
