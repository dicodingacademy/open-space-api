const getUsersMeHandler = require('../libs/handlers/v1/getUsersMeHandler');
const {
  commonWithAuthHandler,
} = require('../libs/utils/functions');

exports.handler = commonWithAuthHandler((event) => {
  if (event.httpMethod === 'GET') {
    return getUsersMeHandler(event);
  }

  return {
    statusCode: 405,
  };
});
