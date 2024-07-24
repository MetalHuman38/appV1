module.exports = {
  apps: [
    {
      name: 'server',
      script: 'dist/server.bundle.js',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log: 'server.log',
      env_production: {
        NODE_ENV: 'production',
        PORT: 8081,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 8081,
      }
    },
    {
      name: 'client',
      script: 'build/bundle.js',
      args: 'serve -s bundle.js -l 8080',
      cwd: './',
      instances: 1,
      autorestart: false,
      watch: false,
      ignore_watch: ['node_modules', 'logs', 'client.log', 'server.log', 'pm2.log', 'ecosystem.config.js'],
      max_memory_restart: '1G',
      log: 'client.log',
      source_map_support: true,
      env: {
        PM2_SERVE_PATH: 'build',
        PM2_SERVE_PORT: 8080,
        PM2_SERVE_SPA: 'true',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: "development"
      }
    },
    {
      name: './start',
      script: 'npm',
      args: 'start',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log: 'start.log',
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: "development"
      }
    },
  ],
};

const env = (() => {
  const { argv } = process
  const envArgIndex = argv.indexOf('--env')
  if (envArgIndex === -1) return
  return argv[envArgIndex + 1]
})();

if (env === 'production') {
  module.exports.apps[0].autorestart = true
  module.exports.apps[1].autorestart = true
  module.exports.apps[1].env.PM2_SERVE_SPA = 'false'
}
