const crypto = require('crypto');
const util = require('util');
const randomBytes = util.promisify(crypto.randomBytes);

function base64URLEncode(buf) {
  return buf.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}
exports.genVerifier = async function () {
  const buf = await randomBytes(32);
  console.log('Original verifier in base64: %s', buf.toString('base64'));
  console.log('Original verifier in hex: %s', buf.toString('hex'));

  return base64URLEncode(buf);
}

exports.genChallenge = function (verifier) {
  const buf = crypto.createHash('sha256')
    .update(verifier)
    .digest();

  console.log('Original challenge in base64: %s', buf.toString('base64'));
  console.log('Original challenge in hex: %s', buf.toString('hex'));
  return base64URLEncode(buf);
}
