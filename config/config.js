var config = {
  production: {
    database: 'mongodb://localhost/starter-dev',
    port: 80
  },
  development: {
    database: 'mongodb://localhost:27017/test-database',
    port: 3000
  }
}

exports.get = function get(env) {
  return config[env] || config.default;
}