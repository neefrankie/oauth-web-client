const debug = require('debug')('oauth:index');
const path = require('path');
const static = require('koa-static');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const home = require('./server/home');

const callback = require('./server/callback');

const appName = 'OAuth2.0 Client';

debug('booting %s', appName);

const port = 9000;
const app = new Koa();
const router = new Router();

app.use(logger());
app.use(static(path.resolve(process.cwd(), 'node_modules')));

router.use('/', home);
router.use('/callback', callback);

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
