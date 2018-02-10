const {randomBytes} = require('crypto');
const util = require('util');
module.exports = util.promisify(randomBytes);