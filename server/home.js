const debug = require('debug')('oauth:home');
const Koa = require('koa');
const Router = require('koa-router');
const render = require('../utils/render');
const randStr = require('../utils/rand-str');
const buildUrl = require('../utils/build-url');
const {token, client, states, endpoints} = require('./config');

const router = new Router();

router.get('/', async function (ctx, next) {
  const state = randStr(5);

  states.set(state, Date.now());

  const endpoint = buildUrl(endpoints.authorize, {
    response_type: 'code',
    client_id: client.client_id,
    redirect_uri: client.redirect_uri,
    state,
    scope: client.scope
  });

  ctx.body = await render('index.html', {
    accessToken: token.access_token,
    scope: token.scope,
    refreshToken: token.refresh_token,
    endpoint
  });
});

module.exports = router.routes();