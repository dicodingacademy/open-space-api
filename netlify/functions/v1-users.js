const getUsersHandler = require('../libs/handlers/v1/getUsersHandler');
const postUserHandler = require('../libs/handlers/v1/postUserHandler');
const {
  commonHandler,
} = require('../libs/utils/functions');

exports.handler = commonHandler((request) => {
  if (request.httpMethod === 'GET') {
    return getUsersHandler();
  }

  if (request.httpMethod === 'POST') {
    return postUserHandler(request);
  }

  return {
    statusCode: 405,
  };
});
