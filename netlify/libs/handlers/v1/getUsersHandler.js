const { createRepository } = require('../../repositories/supabase');
const getAllUsersUseCase = require('../../usecase/getAllUsersUseCase');
const { response } = require('../../utils/functions');

async function getUsersHandler() {
  const repository = createRepository();
  const users = await getAllUsersUseCase(repository);

  return response({
    data: { users },
  });
}

module.exports = getUsersHandler;
