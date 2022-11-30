const { createRepository } = require('../../repositories/supabase');
const getTalkDetailUseCase = require('../../usecase/getTalkDetailUseCase');
const { response } = require('../../utils/functions');

async function getTalkDetailHandler(id) {
  const repository = createRepository();
  const talkDetail = await getTalkDetailUseCase({ id }, { repository });

  return response({
    data: { talkDetail },
  });
}

module.exports = getTalkDetailHandler;
