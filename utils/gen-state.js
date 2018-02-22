const randomBytes = require('./random-bytes');
const base64url = require('./base64url');

/**
 * keyGen - Generate a random hex string
 *
 * @return {string} length of 12 
 */

async function genState() {
  const buf = await randomBytes(9);
  return base64url.encode(buf);
}

module.exports = genState;
