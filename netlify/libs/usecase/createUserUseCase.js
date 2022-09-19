const InvariantError = require('../exceptions/InvariantError');

async function createUserUseCase({ id, name, password }, { repository, hasher }) {
  const isUserIdAlreadyExist = await repository.isUserIdAlreadyExist(id);

  if (isUserIdAlreadyExist) {
    throw new InvariantError('User ID already exist');
  }

  const isUserIdContainSpace = id.includes(' ');

  if (isUserIdContainSpace) {
    throw new InvariantError('User ID cannot contain space');
  }

  // restricted symbol @#!?&$%*()_+|~=`{}[]:";'<>.,/
  const isUserIncludeRestrictedSymbol = /[@#!?&$%*()_+|~=`{}[\]:";'<>.,/]/.test(id);

  if (isUserIncludeRestrictedSymbol) {
    throw new InvariantError('User ID cannot contain @ symbol');
  }

  const isPasswordLessThanSixCharacters = password.length < 6;

  if (isPasswordLessThanSixCharacters) {
    throw new InvariantError('Password length must be at least 6 characters');
  }

  const photo = `https://ui-avatars.com/api/?name=${name}&background=random`;
  const hashedPassword = await hasher.hash(password);

  await repository.createUser({
    id, name, photo, password: hashedPassword,
  });

  return { id, name, photo };
}

module.exports = createUserUseCase;
