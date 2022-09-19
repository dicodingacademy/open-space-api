const config = {
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    table: {
      users: process.env.SUPABASE_TABLE_USERS,
      talks: process.env.SUPABASE_TABLE_TALKS,
      likes: process.env.SUPABASE_TABLE_LIKES,
    },
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
  },
};

module.exports = config;
