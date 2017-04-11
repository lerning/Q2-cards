
module.exports = {
  development: {
     client: 'pg',
     connection: 'postgres://localhost/flash_db',
 },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
