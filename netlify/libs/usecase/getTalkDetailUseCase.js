const NotFoundError = require('../exceptions/NotFoundError');

async function getTalkDetailUseCase({ id }, { repository }) {
  const talk = await repository.getTalkById(id);
  let parent = null;
  let userParent = null;
  let parentLikes = null;

  if (!talk) {
    throw new NotFoundError('talk not found');
  }

  if (talk.replyTo) {
    parent = await repository.getTalkById(talk.replyTo) || null;
  }

  const user = await repository.getUserById(talk.user);
  const likes = await repository.getLikesByTalkId(talk.id);

  if (parent) {
    userParent = await repository.getUserById(parent.user);
    parentLikes = await repository.getLikesByTalkId(parent.id);
  }

  delete talk.replyTo;

  return {
    ...talk,
    user,
    likes: likes.map((like) => like.user_id),
    parent: parent ? {
      ...parent,
      user: userParent,
      likes: parentLikes.map((like) => like.user_id),
    } : null,
  };
}

module.exports = getTalkDetailUseCase;
