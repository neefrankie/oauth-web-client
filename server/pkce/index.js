const debug = require('debug')('oauth:pkce');
const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();

const authorize = require('./authorize');
const callback = require('./callback');

router.get('/', async (ctx, next) => {
  ctx.body = 'Try PKCE'
});

router.use('/authorize', authorize);
router.use('/callback', callback);

module.exports = router.routes();
