const mysql = require('mysql2/promise');

// const dbConfig = {
//   host: 'localhost',
//   port: 3306,
//   database: 'doctordashboarutn',
//   user: 'root',
//   password: '',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// };

const dbConfig = {
  host: 'bkopmpuhwogixbvgartt-mysql.services.clever-cloud.com',
  port: 3306,
  database: 'bkopmpuhwogixbvgartt',
  user: 'urvb2p27znjtnhwm',
  password: 'pLb18O4kWLeU0qdcd8Mt',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;