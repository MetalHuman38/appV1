module.exports = {
  apps: [
    {
      name: './start',
      script: 'npm',
      args: 'start',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      log: 'app.log',
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
