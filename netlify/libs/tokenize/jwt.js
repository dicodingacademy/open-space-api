const jwt = require('jsonwebtoken');
const config = require('../utils/config');

function createTokenize() {
  return {
    createAccessToken: (payload) => jwt.sign(payload, config.jwt.secretKey),
    verifyAccessToken: (token) => jwt.verify(token, config.jwt.secretKey),
    decodePayload: (token) => jwt.decode(token),
  };
}

module.exports = createTokenize;
