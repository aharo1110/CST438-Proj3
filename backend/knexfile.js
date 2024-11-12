const { database } = require('./src/config');

module.exports = {
  development: {
    client: 'mysql2',
    connection: database,
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeds'
    }
  },
  production: {
    client: 'mysql2',
    connection: database,
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeds'
    }
  }
};