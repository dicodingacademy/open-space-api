const { createRepository } = require('../libs/repositories/supabase');

exports.handler = async () => {
  const repository = createRepository();

  await repository.resetData();

  return {
    statusCode: 200,
  };
};
