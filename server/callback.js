const debug = require('debug')('oauth:callback');
const qs = require('querystring');
const Koa = require('koa');
const Router = require('koa-router');
const fetch = require('node-fetch');
const authHeader = require('../utils/auth-header');
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
    ctx.body = query;
    return;
  }

  if (!states.delete(query.state)) {
    ctx.body = {
      error: 'state does not match'
    };
    return;
  }

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${authHeader.encode(client.client_id, client.client_secret)}`,
    'Accept': 'application/json'
  };
  debug('Request oauth header: ', headers);

  const sessionCode = ctx.query.code;

  const formData = qs.stringify({
    grant_type: 'authorization_code',
    code: sessionCode,
    redirect_uri: client.redirect_uri
  });
  
  const tokenRes = await fetch(endpoints.accessToken, {
    method: 'POST',
    headers: headers,
    body: formData,
  });

  // If /oauth response has problems, stop.
  if (tokenRes.status >= 300) {
    ctx.body = {
      error: tokenRes.status
    };
    return;
  }

  return ctx.body = await tokenRes.json();
});

module.exports = router.routes();