const debug = require('debug')('oauth:gh-authorize');
const Koa = require('koa');
const Router = require('koa-router');
const render = require('../../utils/render');
const randStr = require('../../utils/random-string');
const buildUrl = require('../../utils/build-url');
const client = require('./client');
const {states} = require('../config');

const router = new Router();
const clientId = process.env.GH_CLIENT_ID;

// Forward user request to Authorization Endpoint
router.get("/", async function(ctx, next) {

  const state = randStr();

  states.set(state, Date.now());

  const authorizeUrl = buildUrl({
    base: 'https://github.com/login/oauth/authorize',
    params: {
      response_type: 'code',
      client_id: clientId,
      redirect_uri: oauth.redirect_uris[0],
      scope: oauth.scope,
      state: oauth.state
    }
  });
  debug("redirect to: ", authorizeUrl);
  ctx.redirect(authorizeUrl);
});

module.exports = router.routes();
