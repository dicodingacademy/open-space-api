const { createClient } = require('@supabase/supabase-js');
const config = require('../utils/config');

function createRepository() {
  const supabase = createClient(config.supabase.url, config.supabase.anonKey);

  function mapTalk(talk) {
    const newTalk = {
      ...talk,
      replyTo: talk.reply_to,
      createdAt: talk.created_at,
    };

    delete newTalk.reply_to;
    delete newTalk.created_at;

    return newTalk;
  }

  function mapUser(user) {
    const newUser = { ...user };
    delete newUser.password;
    delete newUser.is_permanent;
    return newUser;
  }

  async function getUsers() {
    const { data: users, error: usersError } = await supabase.from(config.supabase.table.users).select('*');
    if (usersError) throw usersError;

    return users.map(mapUser);
  }

  async function getUserById(id) {
    const { data: users, error: usersError } = await supabase.from(config.supabase.table.users).select('*').eq('id', id);
    if (usersError) throw usersError;

    return users.map(mapUser)[0] || null;
  }

  async function getUserWithPasswordById(id) {
    const { data: users, error: usersError } = await supabase.from(config.supabase.table.users).select('*').eq('id', id);
    if (usersError) throw usersError;

    return users[0] || null;
  }

  async function getTalks() {
    const { data: talks, error: talksError } = await supabase.from(config.supabase.table.talks).select('*');
    if (talksError) throw talksError;

    return talks.map(mapTalk);
  }

  async function getTalkById(id) {
    const { data: talk, error: talkError } = await supabase.from(config.supabase.table.talks).select('*').eq('id', id);
    if (talkError) throw talkError;

    return talk.map(mapTalk)[0] || null;
  }

  async function getLikesByTalkId(id) {
    const { data: likes, error: likesError } = await supabase.from(config.supabase.table.likes).select('*').eq('talk_id', id);
    if (likesError) throw likesError;

    return likes;
  }

  async function isTalkLiked(talkId, userId) {
    const { data: likes, error: likesError } = await supabase.from(config.supabase.table.likes).select('*').eq('talk_id', talkId).eq('user_id', userId);
    if (likesError) throw likesError;

    return likes.length > 0;
  }

  async function likeTalk(id, user) {
    const { error: likesError } = await supabase.from(config.supabase.table.likes)
      .insert([{ talk_id: id, user_id: user }]);
    if (likesError) throw likesError;
  }

  async function unlikeTalk(id, user) {
    const { error: likesError } = await supabase.from(config.supabase.table.likes)
      .delete().match({ talk_id: id, user_id: user });
    if (likesError) throw likesError;
  }

  async function isUserIdAlreadyExist(id) {
    const { data: user, error: userError } = await supabase.from(config.supabase.table.users).select('*').eq('id', id);
    if (userError) throw userError;

    return user.length > 0;
  }

  async function createUser(user) {
    const { error: userError } = await supabase.from(config.supabase.table.users).insert([user]);
    if (userError) throw userError;
  }

  async function createTalk({
    id, user, text, replyTo = '', createdAt,
  }) {
    const { error: talkError } = await supabase.from(config.supabase.table.talks)
      .insert([{
        id, user, text, reply_to: replyTo, created_at: createdAt,
      }]);

    if (talkError) throw talkError;
  }

  async function resetData() {
    const { error } = await supabase
      .rpc('open_space_reset_data');

    if (error) console.error(error);
  }

  return {
    getUsers,
    getTalks,
    getTalkById,
    getLikesByTalkId,
    likeTalk,
    unlikeTalk,
    isUserIdAlreadyExist,
    createUser,
    getUserById,
    getUserWithPasswordById,
    createTalk,
    isTalkLiked,
    resetData,
  };
}

module.exports = { createRepository };
