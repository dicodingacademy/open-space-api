const InvariantError = require('../exceptions/InvariantError');

async function getOwnProfileUseCase({ id }, { repository }) {
  const user = await repository.getUserById(id);

  if (!user) {
    throw new InvariantError('user not found');
  }

  return user;
}

module.exports = getOwnProfileUseCase;
