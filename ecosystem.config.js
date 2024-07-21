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
      env: {
        NODE_ENV: 'production',
        PORT: 8081,
      },
    },
    {
      name: 'client',
      script: 'build/bundle.js',
      args: 'serve -s bundle.js -l 8080',
      cwd: './',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log: 'client.log',
      source_map_support: true,
      env: {
        PM2_SERVE_PATH: './build',
        PM2_SERVE_PORT: 8080,
        PM2_SERVE_SPA: 'true',
      },
    },
  ],
};

const env = (() => {
  const { argv } = process
  const envArgIndex = argv.indexOf('--env')
  if (envArgIndex === -1) return
  return argv[envArgIndex + 1]
})();

if (env === 'development') {
  module.exports.apps[0].autorestart = true
  module.exports.apps[1].autorestart = true
  module.exports.apps[1].env.PM2_SERVE_SPA = 'false'
}
