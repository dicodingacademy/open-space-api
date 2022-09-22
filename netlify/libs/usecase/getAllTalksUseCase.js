async function getAllTalksUseCase({ repository }) {
  const talks = await repository.getTalks();

  const talksWithLikes = await Promise.all(talks.map(async (talk) => {
    const likes = await repository.getLikesByTalkId(talk.id);
    return {
      ...talk,
      likes: likes.map((like) => like.user_id),
    };
  }));

  return talksWithLikes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

module.exports = getAllTalksUseCase;
