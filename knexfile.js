
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/threeohthree_software',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }

};
