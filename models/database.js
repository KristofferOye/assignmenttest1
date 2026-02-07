const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DB_PORT
});

module.exports = pool;
