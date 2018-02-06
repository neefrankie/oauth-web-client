const debug = require('debug')('oauth:callback');
const qs = require('querystring');
const Koa = require('koa');
const Router = require('koa-router');
const got = require('got');
const {states} = require('../config');
const router = new Router();

const clientId = process.env.GH_CLIENT_ID;
const clientSecret = process.env.GH_CLIENT_SECRET;

/**
 * GET /callback?state=<string>&code=<>&error=<null|string>
 */
router.get("/", async function(ctx, next) {
  debug('GET callback');


  /**
   * @type {Object} query
   * @property {string} code
   * @property {string} state
   * @property {string?} error
   */
  const query = ctx.query;

  debug('Query: %O', query);

  if (query.error) {
    ctx.body = {'error': query.error}
    return;
  }

  // Now we received the state send by /authorize
  if (!states.delete(query.state)) {
    ctx.body = {'error': 'State value did not match'};
    return;
  }

  const code = ctx.query.code;

  debug('Requesting to token endpoint...');
  const resp = await got('https://github.com/login/oauth/access_token', {
    form: true,
    json: true,
    auth: `${clientId}:${clientSecret}`,
    body: {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: client.redirect_uri
    }
  });

  debug('Token response: %O', resp);

  if (resp.statusCode > 300) {
    ctx.status = resp.status;
    return ctx.body = resp.body.error;
  }

  ctx.body = resp.body;
});

module.exports = router.routes();
