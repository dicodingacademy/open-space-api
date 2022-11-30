const getUsersHandler = require('../libs/handlers/v1/getUsersHandler');
const postUserHandler = require('../libs/handlers/v1/postUserHandler');
const {
  commonHandler,
} = require('../libs/utils/functions');

exports.handler = commonHandler((event) => {
  if (event.httpMethod === 'GET') {
    return getUsersHandler();
  }

  if (event.httpMethod === 'POST') {
    return postUserHandler(event);
  }

  return {
    statusCode: 405,
  };
});
