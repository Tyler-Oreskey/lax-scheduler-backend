require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8000,
  origin: process.env.ORIGIN || 'localhost:3000',
  database: {
    client: process.env.DATABASE_CLIENT || 'pg',
    connection: {
      host: process.env.DATABASE_HOST || 'localhost',
      user: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || null,
      database: process.env.DATABASE_PATH || 'lax_scheduler',
    },
  },
};
