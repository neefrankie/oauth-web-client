const debug = require('debug')('oauth:home');
const Koa = require('koa');
const Router = require('koa-router');
const randStr = require('../utils/rand-str');
const buildUrl = require('../utils/build-url');
const {client, states, endpoints} = require('./config');
const render = require('../utils/render');

const router = new Router();

router.get('/', async function (ctx, next) {

  ctx.body = await render('index.html',);
});

module.exports = router.routes();
