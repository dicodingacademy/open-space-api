const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');
const { createRepository } = require('../../repositories/supabase');
const toggleLikeUseCase = require('../../usecase/toggleLikeUseCase');
const { response } = require('../../utils/functions');

function validatePostTalksLikesPayload(payload) {
  const scheme = Joi.object({
    talkId: Joi.string().required(),
  });

  const { error, value } = scheme.validate(payload);

  if (error) {
    throw new InvariantError(error.message);
  }

  return value;
}

async function postTalksLikesHandler(authedEvent) {
  const { body } = authedEvent;
  const { id } = authedEvent.authPayload;

  const repository = createRepository();

  const { talkId } = validatePostTalksLikesPayload(JSON.parse(body));

  await toggleLikeUseCase({ talkId, userId: id }, { repository });

  return response({
    statusCode: 200,
  });
}

module.exports = postTalksLikesHandler;
