const keyGen = require('../utils/key-gen');
const {createHash} = require('crypto');

async function codeChallenge() {
  const codeVerifier = await keyGen(40);
  console.log(codeVerifier);

  const codeChallenge = createHash('sha256')
    .update(codeVerifier)
    .digest('base64');
  console.log(codeChallenge);
  console.log(codeChallenge.length);
  const hex = createHash('sha256')
    .update(codeVerifier)
    .digest('hex');
  console.log(hex);
}

codeChallenge()
  .catch(err => {
    console.log(err);
  });