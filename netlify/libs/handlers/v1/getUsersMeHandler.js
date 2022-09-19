const ClientError = require('../../exceptions/ClientError');
const { createRepository } = require('../../repositories/supabase');
const getOwnProfileUseCase = require('../../usecase/getOwnProfileUseCase');
const { response } = require('../../utils/functions');

async function getUsersMeHandler(userId) {
  const repository = createRepository();

  try {
    const user = await getOwnProfileUseCase({ id: userId }, { repository });
    return response({
      data: { user },
    });
  } catch (error) {
    if (error instanceof ClientError) {
      return response({
        statusCode: error.statusCode,
        message: error.message,
      });
    }

    console.error(error);

    return response({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}

module.exports = getUsersMeHandler;
