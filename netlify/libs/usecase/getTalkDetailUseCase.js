const NotFoundError = require('../exceptions/NotFoundError');

async function getTalkDetailUseCase({ id }, { repository }) {
  const talk = await repository.getTalkById(id);
  let parent = null;

  if (!talk) {
    throw new NotFoundError('talk not found');
  }

  if (talk.replyTo) {
    parent = await repository.getTalkById(talk.replyTo) || null;
  }

  const user = await repository.getUserById(talk.user);
  const likes = await repository.getLikesByTalkId(talk.id);

  delete talk.replyTo;

  return {
    ...talk,
    user,
    likes: likes.map((like) => like.user_id),
    parent,
  };
}

module.exports = getTalkDetailUseCase;
