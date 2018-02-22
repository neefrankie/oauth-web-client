const debug = require('debug')('oauth:authorization');
const Koa = require('koa');
const Router = require('koa-router');
const genState = require('../utils/gen-state');
const buildUrl = require('../utils/build-url');
const {client, states, endpoints} = require('./config');

const router = new Router();

router.get('/', async (ctx, next) => {
  const state = await genState();

  states.set(state, Date.now());

  const redirectTo = buildUrl({
    base: endpoints.authorize,
    params: {
      response_type: 'code',
      client_id: client.client_id,
      redirect_uri: client.redirect_uri,
      state,
      scope: client.scope
    }
  });

  debug('Redirect to: %s', redirectTo);

  ctx.redirect(redirectTo);
});

module.exports = router.routes();
