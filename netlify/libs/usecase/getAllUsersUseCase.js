async function getAllUsersUseCase(repository) {
  return repository.getUsers();
}

module.exports = getAllUsersUseCase;
