const debug = require('debug')('oauth:index');
const path = require('path');
const static = require('koa-static');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const home = require('./server/home');

const callback = require('./server/callback');
const authorization = require('./server/authorization');

const appName = 'OAuth2.0 Web Client';

debug('booting %s', appName);

const port = 3000;
const app = new Koa();
const router = new Router();

app.use(logger());
app.use(static(path.resolve(process.cwd(), 'node_modules')));
app.use(static(path.resolve(process.cwd(), 'client')));

router.use('/', home);
router.use('/callback', callback);
router.use('/authorization', authorization);

app.use(router.routes());

// Create HTTP server
const server = app.listen(port);

// Logging server error.
server.on('error', (error) => {
  debug(`Server error: %O`, error);
});

// Listening event handler
server.on('listening', () => {
  debug(`${appName} running on %o`, server.address());
});
