const InvariantError = require('../exceptions/InvariantError');

async function loginUserUseCase({ id, password }, { repository, hasher, tokenize }) {
  const user = await repository.getUserWithPasswordById(id);

  if (!user) {
    throw new InvariantError('User ID or password is wrong');
  }

  const isPasswordMatch = await hasher.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new InvariantError('User ID or password is wrong');
  }

  delete user.password;

  const token = tokenize.createAccessToken(user);

  return token;
}

module.exports = loginUserUseCase;
