const Chance = require('chance');
const chance = new Chance();

module.exports = function randomString(size=10) {
  return chance.string({
    pool: 'abcdedfhigklmnopqrstuvwxyz0123456789',
    length: size
  });
};
