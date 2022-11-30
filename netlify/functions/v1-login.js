const postLoginHandler = require('../libs/handlers/v1/postLoginHandler');
const {
  commonHandler,
} = require('../libs/utils/functions');

exports.handler = commonHandler((event) => {
  if (event.httpMethod === 'POST') {
    return postLoginHandler(event);
  }

  return {
    statusCode: 405,
  };
});
