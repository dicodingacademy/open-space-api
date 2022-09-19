const postLoginHandler = require('../libs/handlers/v1/postLoginHandler');
const { withCors } = require('../libs/utils/functions');

exports.handler = withCors((request) => {
  if (request.httpMethod === 'POST') {
    return postLoginHandler(request);
  }

  return {
    statusCode: 405,
  };
});
