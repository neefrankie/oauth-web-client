const debug = require('debug')('oauth:callback');
const qs = require('querystring');
const Koa = require('koa');
const Router = require('koa-router');
const got = require('got');
const {client, endpoints} = require('./config');
const router = new Router();

/**
 * Handle authorization response
 */
router.get("/", async function(ctx, next) {

  debug('Requesting to token endpoint...');
  const resp = await got(endpoints.token, {
    method: 'POST',
    form: true,
    json: true,
    auth: `${client.client_id}:${client.client_secret}`,
    body: {
      grant_type: 'client_credentials'
    }
  });

  if (resp.statusCode > 300) {
    ctx.status = resp.status;
    return ctx.body = resp.body.error;
  }

  ctx.body = resp.body;
});

module.exports = router.routes();
