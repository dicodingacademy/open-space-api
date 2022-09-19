const Joi = require('joi');
const ClientError = require('../../exceptions/ClientError');
const InvariantError = require('../../exceptions/InvariantError');
const createHasher = require('../../hasher/bcrypt');
const { createRepository } = require('../../repositories/supabase');
const createUserUseCase = require('../../usecase/createUserUseCase');
const { response } = require('../../utils/functions');

function validatePostUserPayload(payload) {
  const scheme = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error, value } = scheme.validate(payload);

  if (error) {
    throw new InvariantError(error.message);
  }

  return value;
}

async function postUserHandler(event) {
  const { body } = event;
  const repository = createRepository();
  const hasher = createHasher();

  try {
    const { id, name, password } = validatePostUserPayload(JSON.parse(body));

    const user = await createUserUseCase({ id, name, password }, { repository, hasher });

    return response({
      statusCode: 201,
      message: 'User created',
      data: {
        user,
      },
    });
  } catch (error) {
    if (error instanceof ClientError) {
      return response({
        statusCode: error.statusCode,
        message: error.message,
      });
    }

    console.error(error);

    return response({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}

module.exports = postUserHandler;
