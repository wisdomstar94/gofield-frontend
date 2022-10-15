module.exports = {
  apps: [{
    name: 'gofield-frontend',
    cwd: './',
    script: 'npm',
    args: 'run start',
    instances: 'max',
    exec_mode: 'cluster',
    listen_timeout: 50000,
    kill_timeout: 5000
  }]
}