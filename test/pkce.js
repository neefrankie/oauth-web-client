const test = require('ava');
const {genVerifier, genChallenge} = require('../utils/challenge-gen');

test('generateCodeVerifer', async t => {
  const verifier = await genVerifier();
  console.log('Code verifier: %s', verifier);

  t.is(verifier.length, 43);

  const challenge = genChallenge(verifier);
  console.log('Code challenge: %s', challenge);

  t.is(challenge.length, 43);
});