const {createHash} = require('crypto');

module.exports = function challengeGen(codeVerifier) {
  return createHash('sha256')
    .update(codeVerifier)
    .digest('base64');
}
