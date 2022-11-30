const { createRepository } = require('../../repositories/supabase');
const getOwnProfileUseCase = require('../../usecase/getOwnProfileUseCase');
const { response } = require('../../utils/functions');

async function getUsersMeHandler(userId) {
  const repository = createRepository();

  const user = await getOwnProfileUseCase({ id: userId }, { repository });
  return response({
    data: { user },
  });
}

module.exports = getUsersMeHandler;
