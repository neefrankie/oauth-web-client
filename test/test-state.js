const test = require('ava');
const genState = require('../utils/gen-state');

test("genState", async t => {
  const state = await genState();

  console.log(state);

  t.is(state.length, 12);
});
