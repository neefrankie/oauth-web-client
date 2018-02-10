const crypto = require('crypto');
const randomBytes = require('./random-bytes');
const base64url = require('./base64url');

exports.genVerifier = async function () {
  const buf = await randomBytes(32);
  console.log('Generate coder verifier: %s', buf.toString('hex'));

  return base64url.encode(buf);
}

exports.genChallenge = function (verifier) {
  const buf = crypto.createHash('sha256')
    .update(verifier)
    .digest();
  console.log('Generate challenge code: %s', buf.toString('hex'));
  return base64url.encode(buf);
}
