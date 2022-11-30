const { createRepository } = require('../../repositories/supabase');
const getAllTalksUseCase = require('../../usecase/getAllTalksUseCase');
const { response } = require('../../utils/functions');

async function getTalksHandler() {
  const repository = createRepository();
  const talks = await getAllTalksUseCase({ repository });

  return response({
    data: { talks },
  });
}

module.exports = getTalksHandler;
