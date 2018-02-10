const debug = require('debug')('oauth:pkce-authorize');
const Koa = require('koa');
const Router = require('koa-router');
const randomString = require('../../utils/random-string');
const buildUrl = require('../../utils/build-url');
const pkce = require('../../utils/pkce');
const {client, states, endpoints} = require('./config');

const router = new Router();

router.get('/', async (ctx, next) => {
  const state = randomString();
  const codeVerifier = await pkce.genVerifier();

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
      code_challenge: pkce.genChallenge(codeVerifier),
      code_challenge_method: 'S256'
    }
  });

  debug('Redirect to: %s', redirectTo);

  ctx.redirect(redirectTo);
});

module.exports = router.routes();
