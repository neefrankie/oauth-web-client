const crypto = require('crypto');
const randomBytes = require('./random-bytes');
const base64url = require('./base64url');


/**
 * anonymous function - description
 *
 * @return {string}  base64url encoded 32 random bytes
 */
exports.genVerifier = async function () {
  // 256 bits of random binary number
  const buf = await randomBytes(32);
  console.log('Generate coder verifier: %s', buf.toString('hex'));

  // Encode those 256 binary numbers with base64 in an url safe way.
  // Each base64 digit represents exactly 6 bits of data.
  // Three 8-bit bytes (i.e., a total of 24 bits) can therefore be represented by four 6-bit base64 encodings.
  // 256 bits are 40 base64 digits with 16 remaining bits.
  // The remaing 16 bits could be represented by 4 base64 digits after padded with zero.
  // The last digit of the ecoded string is `=`.
  // Standard base64 use `+` for 62nd digit, `-` for 63rd digit, and `=` for pad.
  // That is not url safe. Thus base63url uses `-` for 62nd digit, `_` for 63, and removes trailing `=`

  return base64url.encode(buf);
}


/**
 * anonymous function - description
 *
 * @param  {string} verifier description
 * @return {string}          description
 */
exports.genChallenge = function (verifier) {
  const buf = crypto.createHash('sha256')
    .update(verifier)
    .digest();
  console.log('Generate challenge code: %s', buf.toString('hex'));
  return base64url.encode(buf);
}
