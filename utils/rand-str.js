const Chance = require('chance');
const chance = new Chance();

function randstr(size=20) {
  return chance.string({
    pool: 'abcdef0123456789',
    length: size
  });
}

if (require.main === module) {
  console.log(randstr());
}

module.exports = randstr;