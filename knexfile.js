
module.exports = {
  development: {
     client: 'pg',
     connection: 'postgres://localhost/flash_db',
 },
  producton: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
