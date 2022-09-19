const crypto = require('crypto');
const InvariantError = require('../exceptions/InvariantError');

async function createTalkUseCase({ text, user, replyTo }, { repository }) {
  function getRandomStringId(prefix, length = 16) {
    const randomString = crypto.randomBytes(length).toString('hex');
    return `${prefix}-${randomString}`;
  }

  console.log(text, user, replyTo);

  const id = getRandomStringId('talk');
  const createdAt = new Date().toISOString();

  if (replyTo) {
    const replyToTalk = await repository.getTalkById(replyTo);

    if (!replyToTalk) {
      throw new InvariantError('Reply to talk not found');
    }
  }

  await repository.createTalk({
    id, user, text, replyTo, createdAt,
  });

  return {
    id, user, text, replyTo, createdAt, likes: [],
  };
}

module.exports = createTalkUseCase;
