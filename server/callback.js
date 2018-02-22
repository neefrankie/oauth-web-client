const debug = require('debug')('oauth:callback');
const qs = require('querystring');
const Koa = require('koa');
const Router = require('koa-router');
const got = require('got');
const {client, states, endpoints} = require('./config');
const router = new Router();

/**
 * Handle authorization response
 */
router.get("/", async function(ctx, next) {
  /**
   * @type {Object} query
   * @property {string} code - session code from server
   * @property {string} state - state we previously sent to server
   * @property {string?} error
   */
  const query = ctx.query;

  debug('Query: %O', query);

  if (query.error) {
    return ctx.body = {
      error: query.error
    };
  }

  if (!states.delete(query.state)) {
    return ctx.body = {
      error: 'state does not match'
    };
  }

  debug('Requesting to token endpoint...');
  const resp = await got(endpoints.token, {
    method: 'POST',
    form: true,
    json: true,
    auth: `${client.client_id}:${client.client_secret}`,
    body: {
      grant_type: 'authorization_code',
      code: query.code,
      redirect_uri: client.redirect_uri
    }
  });

  if (resp.statusCode > 300) {
    ctx.status = resp.status;
    return ctx.body = resp.body.error;
  }

  ctx.body = resp.body;
});

module.exports = router.routes();
