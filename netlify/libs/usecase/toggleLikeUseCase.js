const InvariantError = require('../exceptions/InvariantError');

async function toggleLikeUseCase({ talkId, userId }, { repository }) {
  const talk = await repository.getTalkById(talkId);

  if (!talk) {
    throw new InvariantError('talk not found');
  }

  const liked = await repository.isTalkLiked(talkId, userId);

  return liked ? repository.unlikeTalk(talkId, userId) : repository.likeTalk(talkId, userId);
}

module.exports = toggleLikeUseCase;
