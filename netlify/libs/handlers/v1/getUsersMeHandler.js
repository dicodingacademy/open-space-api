const { createRepository } = require('../../repositories/supabase');
const getOwnProfileUseCase = require('../../usecase/getOwnProfileUseCase');
const { response } = require('../../utils/functions');

async function getUsersMeHandler(authedEvent) {
  const { id } = authedEvent.authPayload;

  const repository = createRepository();

  const user = await getOwnProfileUseCase({ id }, { repository });
  return response({
    data: { user },
  });
}

module.exports = getUsersMeHandler;
