const getTalkDetailHandler = require('../libs/handlers/v1/getTalkDetailHandler');
const { withCors, response } = require('../libs/utils/functions');

exports.handler = withCors((event) => {
  if (event.httpMethod !== 'GET') {
    return response({
      statusCode: 405,
    });
  }

  const { path } = event;
  const id = path.replace('/v1/talks/', '');

  return getTalkDetailHandler(id);
});
