const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');
const createHasher = require('../../hasher/bcrypt');
const { createRepository } = require('../../repositories/supabase');
const createTokenize = require('../../tokenize/jwt');
const loginUserUseCase = require('../../usecase/loginUserUseCase');
const { response } = require('../../utils/functions');

function validatePostLoginPayload(payload) {
  const scheme = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error, value } = scheme.validate(payload);

  if (error) {
    throw new InvariantError(error.message);
  }

  return value;
}

async function postLoginHandler(event) {
  const { body } = event;

  const tokenize = createTokenize();
  const hasher = createHasher();
  const repository = createRepository();

  const { id, password } = validatePostLoginPayload(JSON.parse(body));

  const token = await loginUserUseCase({ id, password }, { repository, hasher, tokenize });

  return response({
    statusCode: 200,
    data: {
      token,
    },
  });
}

module.exports = postLoginHandler;
