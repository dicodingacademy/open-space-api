const getUsersMeHandler = require('../libs/handlers/v1/getUsersMeHandler');
const {
  withCors, withAuth,
  withErrorHandler,
} = require('../libs/utils/functions');

exports.handler = withCors(
  withErrorHandler(
    withAuth((request, _, { id }) => {
      if (request.httpMethod === 'GET') {
        return getUsersMeHandler(id);
      }

      return {
        statusCode: 405,
      };
    }),
  ),
);
