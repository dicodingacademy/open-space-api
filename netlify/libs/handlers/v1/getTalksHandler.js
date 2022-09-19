const { createRepository } = require('../../repositories/supabase');
const getAllTalksUseCase = require('../../usecase/getAllTalksUseCase');
const { response } = require('../../utils/functions');

async function getTalksHandler() {
  const repository = createRepository();
  try {
    const talks = await getAllTalksUseCase({ repository });

    return response({
      data: { talks },
    });
  } catch (error) {
    console.error(error);
    return response({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}

module.exports = getTalksHandler;
