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

async function postTalksLikesHandler(request, { id }) {
  const { body } = request;
  const repository = createRepository();

  try {
    const { talkId } = validatePostTalksLikesPayload(JSON.parse(body));

    await toggleLikeUseCase({ talkId, userId: id }, { repository });

    return response({
      statusCode: 200,
    });
  } catch (error) {
    if (error instanceof InvariantError) {
      return response({
        statusCode: 400,
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

module.exports = postTalksLikesHandler;
