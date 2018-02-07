const debug = require('debug')('oauth:pkce-authorize');
const Koa = require('koa');
const Router = require('koa-router');
const randStr = require('../../utils/rand-str');
const buildUrl = require('../../utils/build-url');
const keyGen = require('../../utils/key-gen');
const challengeGen = require('../../utils/challenge-gen');
const {client, states, endpoints} = require('./config');

const router = new Router();

router.get('/', async (ctx, next) => {
  const state = randStr();
  const codeVerifier = await keyGen(40);

  states.set(state, codeVerifier);
  debug('Current state entries: %O', states);

  const redirectTo = buildUrl({
    base: endpoints.authorize,
    params: {
      response_type: 'code',
      client_id: client.client_id,
      redirect_uri: client.redirect_uri,
      state,
      scope: client.scope,
      code_challenge: challengeGen(codeVerifier),
      code_challenge_method: 'S256'
    }
  });

  debug('Redirect to: %s', redirectTo);

  ctx.redirect(redirectTo);
});

module.exports = router.routes();
