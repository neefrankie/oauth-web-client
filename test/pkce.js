const keyGen = require('../utils/key-gen');
const {createHash} = require('crypto');

async function codeChallenge() {
  const codeVerifier = await keyGen(40);
  console.log('Code verfier: %s', codeVerifier);

  // 1 base64 digit represents 6 bits of data. 256 / 6 = 42 ... 4
  const codeChallenge = createHash('sha256')
    .update(codeVerifier)
    .digest('base64');
  console.log('Base64 codeChallenge: %s', codeChallenge);

  const hex = createHash('sha256')
    .update(codeVerifier)
    .digest('hex');
  console.log('hex codeChallenge: %s', hex);
}

codeChallenge()
  .catch(err => {
    console.log(err);
  });