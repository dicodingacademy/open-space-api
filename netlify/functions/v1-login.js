const postLoginHandler = require('../libs/handlers/v1/postLoginHandler');
const {
  commonHandler,
} = require('../libs/utils/functions');

exports.handler = commonHandler((request) => {
  if (request.httpMethod === 'POST') {
    return postLoginHandler(request);
  }

  return {
    statusCode: 405,
  };
});
