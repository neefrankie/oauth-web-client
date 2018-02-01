const debug = require('debug')('oauth:home');
const Koa = require('koa');
const Router = require('koa-router');
const render = require('../utils/render');

const router = new Router();

router.get('/', async function (ctx, next) {
  ctx.body = await render('index.html',);
});

module.exports = router.routes();
