const getUsersMeHandler = require('../libs/handlers/v1/getUsersMeHandler');
const {
  withAuth,
  commonHandler,
} = require('../libs/utils/functions');

exports.handler = commonHandler(
  withAuth((request, _, { id }) => {
    if (request.httpMethod === 'GET') {
      return getUsersMeHandler(id);
    }

    return {
      statusCode: 405,
    };
  }),
);
