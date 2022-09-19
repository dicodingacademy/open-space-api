const bcrypt = require('bcrypt');

function createHasher() {
  return {
    hash: (password) => bcrypt.hash(password, 10),
    compare: (password, hash) => bcrypt.compare(password, hash),
  };
}

module.exports = createHasher;
