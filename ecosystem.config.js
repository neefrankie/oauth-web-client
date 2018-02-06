const path = require('path');
const interpreter = path.resolve(process.env.HOME, 'n/n/versions/node/9.3.0/bin/node');

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : "gh-oauth-app",
      script    : "./app.js",
      cwd: __dirname,
      interpreter: interpreter,
      env: {
        NODE_ENV: "development",
        PORT: 8123,
        DEBUG: "koa*,oauth*"
      },
      env_production : {
        NODE_ENV: "production",
        PORT: 8123,
        DEBUG: "oauth*"
      },
      max_restart: 10,
      error_file: path.resolve(process.env.HOME, 'logs/oauth-err.log'),
      out_file: path.resolve(process.env.HOME, 'logs/oauth-out.log')
    }
  ]
}
