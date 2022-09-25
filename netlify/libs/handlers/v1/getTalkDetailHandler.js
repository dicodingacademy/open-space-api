const ClientError = require('../../exceptions/ClientError');
const { createRepository } = require('../../repositories/supabase');
const getTalkDetailUseCase = require('../../usecase/getTalkDetailUseCase');
const { response } = require('../../utils/functions');

async function getTalkDetailHandler(id) {
  const repository = createRepository();
  try {
    const talkDetail = await getTalkDetailUseCase({ id }, { repository });

    return response({
      data: { talkDetail },
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

module.exports = getTalkDetailHandler;
