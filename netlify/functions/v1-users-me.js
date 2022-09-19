const getUsersMeHandler = require('../libs/handlers/v1/getUsersMeHandler');
const { withCors, withAuth } = require('../libs/utils/functions');

exports.handler = withCors(withAuth((request, _, { id }) => {
  if (request.httpMethod === 'GET') {
    return getUsersMeHandler(id);
  }

  return {
    statusCode: 405,
  };
}));
