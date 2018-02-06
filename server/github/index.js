const debug = require('debug')('oauth:gh-authorize');
const Koa = require('koa');
const Router = require('koa-router');

const router = new Router();

const authorize = require('./authorize');
const callback = require('./callback');

router.get('/authorize', authorize);
router.get('/callback', callback);

module.exports = router.routes();
