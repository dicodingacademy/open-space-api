const { createRepository } = require('../../repositories/supabase');
const getAllUsersUseCase = require('../../usecase/getAllUsersUseCase');
const { response } = require('../../utils/functions');

async function getUsersHandler() {
  const repository = createRepository();

  try {
    const users = await getAllUsersUseCase(repository);
    return response({
      data: { users },
    });
  } catch (error) {
    console.error(error);

    return response({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}

module.exports = getUsersHandler;
