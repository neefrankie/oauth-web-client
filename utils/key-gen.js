const randomBytes = require('./random-bytes');

/**
 * keyGen - Generate a random hex string
 *
 * @param  {number} len byte length
 * @return {string}     the length or returned string is 2 * len
 */
async function keyGen(len=20) {
  const buf = await randomBytes(len)
  return buf.toString('hex');
}

module.exports = keyGen;
